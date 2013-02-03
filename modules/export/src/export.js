var yaml  = require('js-yaml'),
    async = require('async'),
    transform = require('../../transform/src/transform'),
    fse  = require('fs-extra'),
    fs  = require('fs'),
    path  = require('path'),
    FileSource = require('../../source/src/source-fs');

/**
	args
*/
var argsDefiniton = {
	applicationFile:  { require: true, type: 'string' },
  patternDirectory: { require: true, type: 'string' },
  objectsDirectory: { require: true, type: 'string' },
  modulesDirectory: { require: true, type: 'string' },
	outputDirectory:  { require: true, type: 'string' },
  dataFile: { require: true, type: 'string' }
};

module.exports = define(argsDefiniton, function(args, callback) {

  //args
  var filePatternSourceArgs = {
    directory : args.patternDirectory,
    toLowerCase: true
  };
  var patternSource = new FileSource(filePatternSourceArgs);

  var fileModulesSource = {
    directory: args.modulesDirectory,
    toLowerCase: true
  }
  var modulesSource = new FileSource(fileModulesSource);

  var fileObjectsSource = {
    directory: args.objectsDirectory,
    toLowerCase: true
  }
  var objectSource = new FileSource(fileObjectsSource);

  var data = JSON.parse(fs.readFileSync(args.dataFile, 'utf8'));

  async.waterfall([
      readApplicationDefinition,
      convertToApplicationObject,
      transformToApplication,
      persistApplication
    ], 
  callback );

  function readApplicationDefinition(callback){
    fs.readFile(args.applicationFile, 'utf8', callback);
  }

  function convertToApplicationObject(fileData, callback){
     try {
      console.log("LOAD");
      var app = yaml.load(fileData);
      callback(null, app);
      console.log("TEST", app);
    } catch(e) {
      console.log(e.stack);
      callback(e);
    }   
  }

  function transformToApplication(application, callback){

    console.log("transform");

    var transformArgs = {
      page: application.page,
      patternSource: patternSource,
      objectSource: objectSource,
      data: data
    }

    transform(transformArgs, callback);
  }

  function persistApplication(page, callback){
    console.log("write");

    fse.mkdirs( args.outputDirectory, afterMakeOutputDirectory );

    function afterMakeOutputDirectory(err){
      if(err){ callback(err); return }

      var outputHtmlFile = args.outputDirectory + "/"+page.name+".html";
      var outputJsFile   = args.outputDirectory + "/"+page.name+".js";

      async.parallel(
        [ 
          saveFile(outputHtmlFile, page.html),
          saveFile(outputJsFile,   page.js),
          saveModule("knockout/knockout-2.1.0.js")
        ],
        callback
      );

      function saveFile(outputFile, data){
        return function(callback){
          fs.writeFile(outputFile, data, 'utf8', callback);
        };
      }

      function saveModule(moduleName){
        return function(callback){
          var moduleFileName = args.outputDirectory + "/modules/" + moduleName;
          fse.mkdirs(path.dirname(moduleFileName), afterMakeModuleDir);
          function afterMakeModuleDir(err){
            saveFile(moduleFileName, modulesSource.get(moduleName))(callback);
          }          
        }
      }
    }
  }
}