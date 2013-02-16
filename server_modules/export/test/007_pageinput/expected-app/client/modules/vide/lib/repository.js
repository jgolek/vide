function Repository(repoData, url){

  var self = this;

  self.url = url ? url : '';

  console.log(repoData);
  var repositoryData = new RepositoryObject(repoData, self.url);
  self.get = repositoryData.get; 

  var updateEnabled = false;

  self.enableUpdate = function(){
    updateEnabled = true;
  }

  function RepositoryObject(data, url, parent){ 
    var cache = {}; // todo: discuss to rename in children.
    var self = this;
    self.url = url;


    function useCache(fn){
      return function(name, Type){
        if(cache[name]) {
          return cache[name];
        }else{
          var object = fn(name, Type);
          cache[name] = object; 
          return object;
        }
      }
    }

    self.get = useCache(function(name, Type){
      var type = null;
      if(Type){
        var url = self.url + '/' + name;
        var typeData = data[name];
        console.log(typeData);
        type = createType(data[name], url, self, Type );
      } else {
        type = data[name];
      }
      var typeObs = ko.observable(type);
      typeObs.subscribe(update(name));
      return typeObs;         
    });

    self.getList = useCache(function(name, Type){
      var url = self.url + '/' + name;
      return new RepositoryList(data[name], Type, url, self );
    });

    function update(name) {
      return function(object) {
        console.log("UPDATE: ", object);
        if(!updateEnabled) return;

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

  function createType(dataArg, url, parent, Type){
    console.log("TYPEDATA", dataArg);
    var typeData = new RepositoryObject(dataArg, url, parent );
    var type = new Type(typeData);
    type._url = url;
    return type;
  }

  function RepositoryList(array, Type, url, parent){
    var self = this;
    self.url = url;

    var arrayWithTypes = [];
    for(var i=0; i < array.length; i++){
      var url = self.url + '/' + i;
      var type = createType(array[i], url, self, Type );
      arrayWithTypes.push(type);
    }
    var arrayObs = ko.observableArray(arrayWithTypes);

    arrayObs.add = function(dto){
      $.ajax({
        type: "POST",
        url: self.url,
        data: dto
      }).done( function(data){
        var url = self.url + '/' + array.length;
        var type = createType(data, url, self, Type );
        arrayObs.push(type);
      });
    }

    arrayObs.del = function(object){
      $.ajax({
        type: "DELETE",
        url: object._url
      }).done(function(data){
        console.log("deleted!");
        arrayObs.remove(object);
      });
    };

    return arrayObs;
  }
}