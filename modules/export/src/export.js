var yaml  = require('js-yaml'),
    async = require('async'),
    transform = require('../../transform/src/transform'),
    fse  = require('fs-extra'),
    fs  = require('fs'),
    path  = require('path'),
    FileSource = require('../../source/src/source-fs'),
    define = require('../../define');

/**
	args
*/
var argsDefiniton = {
	applicationFile:  { require: true, type: 'string' },
  patternDirectory: { require: true, type: 'string' },
  objectsDirectory: { require: true, type: 'string' },
  dataDirectory:    { require: true, type: 'string' },
  outputDirectory:  { require: true, type: 'string' }
};

module.exports = define(argsDefiniton, function(args, callback) {

  readApplicationDefinition( args.applicationFile, afterReadApplicationDefinition );

  function afterReadApplicationDefinition(err, applicationDefinition){
    createApplication(applicationDefinition, callback);
  }

  function createApplication(applicationDefinition, callback){

    async.series(
      [ 
        createDir('/'), createAppJs,
        createDir('/data'), createData,
        createDir('/server'), createServer,
        createDir('/client'), 
        createDir('/client/modules'), 
        createClient 
      ],
      function(err, list){
        console.log(err, list);
        callback(err, list);
      }
    );

    function createDir(dirname){
      return function(callback){
        fse.mkdirs(args.outputDirectory + '/' + dirname, callback);
      }
    }

    function createAppJs(callback){
      fse.copy(__dirname + '/files/app.js', args.outputDirectory + '/app.js', callback );
    }

    function createData(callback){
      if(args.dataDirectory){
        fse.copy(args.dataDirectory, args.outputDirectory + '/data', callback);
      }else{
        callback();
      }
    }

    function createServer(callback){
      async.forEach(
        applicationDefinition.requiredModules.server, 
        copyServerModule, 
        callback
      );

      function copyServerModule(modulePath, callback){
        var moduleName = path.basename(modulePath);
        fse.copy( modulePath, args.outputDirectory + '/server/'+moduleName, callback ); 
      }
    }

    function createClient(callback){

      async.waterfall(
        [
          copyClientModules,
          createPage,
          persistPage
        ], 
        callback
      );

      function createPage(callback){

        var filePatternSourceArgs = {
          directory : args.patternDirectory,
          toLowerCase: true
        };
        var patternSource = new FileSource(filePatternSourceArgs);

        var fileObjectsSource = {
          directory: args.objectsDirectory,
          toLowerCase: true
        };
        var objectSource = new FileSource(fileObjectsSource);

        var transformArgs = {
          page: applicationDefinition.page,
          patternSource: patternSource,
          objectSource: objectSource
        }

        transform(transformArgs, callback);
      }

      function persistPage(page, callback){

        var outputHtmlFile = args.outputDirectory + "/client/"+page.name+".html";
        var outputJsFile   = args.outputDirectory + "/client/"+page.name+".js";

        async.parallel(
          [ 
            saveFile(outputHtmlFile, page.html),
            saveFile(outputJsFile,   page.js),
          ],
          callback
        );

        function saveFile(outputFile, data){
          return function(callback){
            fs.writeFile(outputFile, data, 'utf8', callback);
          };
        }
      }

      function copyClientModules(callback){
        async.forEach(
          applicationDefinition.requiredModules.client, 
          copyClientModule, 
          callback
        );

        function copyClientModule(modulePath, callback){
          if(!fs.existsSync(modulePath)){
            throw new Error("file doen't exists " + path.resolve(modulePath));
          }
          var moduleName = path.basename(modulePath);
          fse.copy( modulePath, args.outputDirectory + '/client/modules/'+moduleName, callback ); 
        }
      }
    }
  }

  function readApplicationDefinition(file, callback){
    fs.readFile(file, 'utf8', convertToApplicationObject);

    function convertToApplicationObject(err, fileData){
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
  }
});