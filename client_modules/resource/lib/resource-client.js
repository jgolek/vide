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

    function update(name) {
      return function(object) {
        console.log("data: ", data);
        console.log("UPDATE: ", self.url, object);
        if(!autoUpdateEnabled) return;

        var dto = {
          name: object
        };

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

    arrayObs.add = function(dto){
      $.ajax({
        type: "POST",
        url: self.url,
        data: dto
      }).done( function(data) {
        data.url = self.url + "/" + data.id;
        var type = createType(data, self, Type );
        arrayObs.push(type);
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