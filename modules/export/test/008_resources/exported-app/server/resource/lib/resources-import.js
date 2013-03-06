var fs = require('fs');

var argsDef = {
  directory: 'String',
  models : 'object'
}

module.exports = function(args, callback){

  var resourceDirectory = args.directory;
  var models = args.models;

  for(var modelName in models){
    var Model = models[modelName];
    var resourceFile = (resourceDirectory + "/" + modelName + "s.json").toLowerCase();
    var modelResources = JSON.parse(fs.readFileSync(resourceFile, 'utf8'));
    modelResources.forEach(function(modelResource){
      new Model(modelResource).save();
    });
  }
}
