var yaml  = require('js-yaml'),
    async = require('async'),
    transform = require('../../transform/src/transform'),
    fse  = require('fs-extra'),
    fs  = require('fs'),
    FileSource = require('../../source/src/source-fs');

/**
	args
*/
var argsDefinition = {
	applicationFile: { require: true, type: 'string'},
  patternDirectory: { require: true, type: 'string'},
	outputDirectory: { require: true, type: 'string'}
};

module.exports = function(args, callback) {

  //args
  var fileSourceArgs = {
    directory : args.patternDirectory,
    fileType: ".html",
    toLowerCase: true
  }
  var patternSource = new FileSource(fileSourceArgs);

  async.waterfall([
      readApplicationDefinition,
      convertToApplicationObject,
      transformToApplication,
      persistApplication
    ], callback );

  function readApplicationDefinition(callback){
    fs.readFile(args.applicationFile, 'utf8', callback);
  }

  function convertToApplicationObject(fileData, callback){
     try {
      console.log("LOAD");
      var app = yaml.load(fileData);
      callback(null, app);
      console.log("TEST");
    } catch(e) {
      console.log(e.stack);
      callback(e);
    }   
  }

  function transformToApplication(application, callback){

    console.log("transform");

    var transformArgs = {
      page: application.page,
      patternSource: patternSource
    }

    transform(transformArgs, callback);
  }

  function persistApplication(page, callback){
    console.log("write");

    fse.mkdirs( args.outputDirectory, afterMakeOutputDirectory );

    function afterMakeOutputDirectory(err){
      if(err){ callback(err); return }

      console.log("mkdir", args.outputDirectory);

      var outputFile = args.outputDirectory + "/"+page.name+".html";
      fs.writeFile(outputFile, page.html, 'utf8', callback);
    }
  }
}