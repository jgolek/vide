/*
  args: 
  [
    {
      url: 'string',
      as: 'string'   
    }
  ]
*/
function Resources(resources, callback){

  var self = this;
  var resourceObject = undefined;
  var resourceData   = undefined;
  var autoUpdateEnabled = false;

  function loadResources(resourcesArgs, callback){
    var loadedResources = [];
    var resourceData = {}; 
    resourcesArgs.forEach(function(resource){ loadResource(resource, done); });

    function loadResource(resource, callback){
      $.get(resource.url, function(data){
        resourceData[resource.as] = data;
        resourceData[resource.as]._url = resource.url;
        loadedResources.push(resource.as);
        callback();
      }); 
    }

    function done(){
      if(resourcesArgs.length == loadedResources.length){
        callback(null, resourceData);
      }
    }
    done();
  };

  self.getObjectOrGetList = function(name, Type){
    if( resourceData[name] instanceof Array ){
      return resourceObject.getList(name, Type);
    } else {
      return resourceObject.get(name, Type);
    }
  }

  self.enableAutoUpdate = function(){
    autoUpdateEnabled = true;
  }

  loadResources(resources, function(err, resourceDataArg){
    resourceObject = new ResourceObject(resourceDataArg);
    resourceData = resourceDataArg;
    console.log(resourceData);
    callback(self);
  });

  function ResourceObject(data, parent){ 
    var cache = {}; // todo: discuss to rename in children.
    var self = this;
    self.url = data._url;
    self.id = data.id;

    function useCache(fn) {
      return function(name, Type){
        if(cache[name]) {
          return cache[name];
        } else {
          var object = fn(name, Type);
          cache[name] = object; 
          return object;
        }
      }
    }

    self.get = useCache(function(name, Type){
      var type = null;
      if(Type){
        var typeData = data[name];
        type = createType(data[name], self, Type );
      } else {
        type = data[name];
      }
      var typeObs = ko.observable(type);
      typeObs.subscribe(update(name));
      return typeObs;         
    });

    self.getList = useCache(function(name, Type){
      return new ResourceList(data[name], Type, self );
    });

    self.getQuery = useCache(function(queryObject, Type){
      return new ResourceQuery(queryObject, Type, self );
    });

    function update(name) {
      return function(object) {
        if(!self.url) { console.log('ignore update: self.url is not defined'); return; }
        console.log("data: ", data);
        console.log("UPDATE: ", self.url, object);
        if(!autoUpdateEnabled) return;

        var dto = {};
        dto[name] = object;
        
        $.ajax({
          type: "PUT",
          url: self.url,
          data: dto
        });
      }
    }
  }

  function createType(dataArg, parent, Type){
    console.log("TYPEDATA", dataArg);
    var typeData = new ResourceObject(dataArg, parent );
    var type = new Type(typeData);

    type.create = function(dto, callback){

        var parts = typeData.url.split('/');
        parts.pop();

        $.ajax({
          type: "POST",
          url: parts.join('/'),
          data: dto
        }).done( function(data) {
          if(callback){
            callback(data);
          }
          console.log ("SAVE->POST");
        });
    }
    return type;
  }

  function ResourceList(array, Type, parent){
    var self = this;
    self.url = array._url;

    var arrayWithTypes = [];
    for(var i=0; i < array.length; i++){
      array[i]._url = array._url + "/" + array[i].id;
      var type = createType(array[i], self, Type );
      arrayWithTypes.push(type);
    }
    var arrayObs = ko.observableArray(arrayWithTypes);

    arrayObs.add = function(dto, callback){
      $.ajax({
        type: "POST",
        url: self.url,
        data: dto
      }).done( function(data) {
        data.url = self.url + "/" + data.id;
        console.log("data", data);
        var type = createType(data, self, Type );
        arrayObs.push(type);
        if(callback){
          callback(type);
        }
      });
    }

    arrayObs.del = function(object){
      $.ajax({
        type: "DELETE",
        url: object.url
      }).done(function(data){
        console.log("deleted!");
        arrayObs.remove(object);
      });
    };

    return arrayObs;
  }

  function ResourceQuery(queryObject, Type, parent){
    var self = this;
    //parseurl    
    self.url = queryObject.url;

    var urlWithQuery = self.url + "?";
    var wheres = [];
    for(var key in queryObject.where){
      wheres.push(key + "="+ queryObject.where[key]);
    }
    urlWithQuery += wheres.join('&');
    console.log(urlWithQuery);

    var arrayObs = ko.observableArray();
    $.ajax({
      type: "GET",
      url: urlWithQuery 
    }).done( function(array){
      console.log("GET", self.url, urlWithQuery, array);
      var arrayWithTypes = [];
      for(var i=0; i < array.length; i++){
        array[i]._url = self.url + "/" + array[i].id;
        var type = createType(array[i], self, Type );
        arrayWithTypes.push(type);
      }
      console.log("GET", array);
      arrayObs(arrayWithTypes);
    });

    arrayObs.add = function(dto, callback){
      for(var key in queryObject.where){
        dto[key] = queryObject.where[key];
      }

      $.ajax({
        type: "POST",
        url: self.url,
        data: dto
      }).done( function(data) {
        data.url = self.url + "/" + data.id;
        console.log("data", data);
        var type = createType(data, self, Type );
        arrayObs.push(type);
        if(callback){
          callback(type);
        }
      });
    }

    arrayObs.del = function(object){
      $.ajax({
        type: "DELETE",
        url: object.url
      }).done(function(data){
        console.log("deleted!");
        arrayObs.remove(object);
      });
    };

    return arrayObs;
  }
}