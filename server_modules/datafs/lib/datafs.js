var fs = require('fs');
var fse = require('fs-extra');
var async = require('async');
var path = require('path');

exports.directory = __dirname + "./data/";

var data = {};
var urlPrefix = "/data";
exports.init = function(directory, urlPrefixArg){
  exports.directory = directory;

  if(urlPrefixArg){ urlPrefix = urlPrefixArg; }

  var files = fs.readdirSync(directory);

  files.forEach(function(file){
    console.log(file);
    var fileParts = file.split('.');
    var name = fileParts[0];
    
    if( fileParts[1] != 'json' ) { return; }
    
    console.log(directory + '/' + file);
    data[name] = JSON.parse(fs.readFileSync(directory + '/' + file, 'utf8'));
  });
  console.log("Read data: ", data);
}

exports.use = function(app){

  app.get(urlPrefix,     getAll );
  app.get(urlPrefix+'/*',     get );
  app.put(urlPrefix+'/*',    update );
  app.post(urlPrefix+'/*',   create );
  app.delete(urlPrefix+'/*', del );

  function getAll(req, res){
    var url = req.url;
    afterOperation(url, res)(null, data);
  }

  function get(req, res){
    var url = req.url;
    exports.get(url, afterOperation(url, res));
  }

  function update(req, res){
    var url = req.url;
    var dataObject = req.body;
    if(!(dataObject instanceof Object)){
      throw new Error("data is not an object! " + url + " "+ dataObject );
    }
    exports.update(url, dataObject, afterOperation(url, res));
  }

  function create(req, res){
    var url = req.url;
    var dataObject = req.body;
    exports.create(url, dataObject, afterOperation(url, res));
  }

  function del(req, res){
    var url = req.url;
    console.log("Delete", url);
    exports.del(url, afterOperation(url, res));
  }

  function afterOperation(url, res){
     return function(err, object){
        if(err) {
          console.log(url, err);
          res.send({}, 404);
        }else{
         console.log("Done:", url);
          res.send(object);                
        }
     }
  }

  return app;
};


exports.get = function(url, callback){
  var url = url.substring(1); 
  var path = url.split('/');
  path.shift(); //todo

  var pathObject = data;
  path.forEach(function(pathPart){
    pathObject = pathObject[pathPart];
    if(pathObject == undefined){
      console.log(data);
      throw new Error('can t find value for url ' + url);
    }
  });

  callback(null, pathObject);
};

exports.update = function(url, sourceData, callback){

  exports.get(url, afterGet);

  function afterGet(err, object){
    if(err) callback(err);

    for(var property in sourceData){
      object[property] = sourceData[property];
    }
    save(url);
    callback();
  }
}

exports.create = function(url, data, callback){

  exports.get(url, afterGet);

  function afterGet(err, list){
    if(err) callback(err);

    list.push(data || {} );
    save(url);
    callback(null, data);
  }
}

exports.del = function(url, callback){

  var parentPath = url.split('/');
  var index = parentPath.pop();

  exports.get(parentPath.join('/'), afterGet);

  function afterGet(err, list){
    if(err) callback(err);

    delete list[index];
    save(url);
    callback();
  }
};

var tout; 
function save(url){
  var path = url.split('/');
  var name = path[2];
  console.log(url, path, name);

  if(tout){
    clearTimeout(tout);
  }
  tout = setTimeout(function(){
      var filename = exports.directory + '/' + name + ".json";
      console.log("saved", filename, data[name]);
      fs.writeFile(filename, JSON.stringify(data[name], null, '  '), 'utf8' );
  }, 500);

}
