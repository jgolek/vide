var yaml  = require('js-yaml'),
    async = require('async'),
    transform = require('../../transform'),
    fse  = require('fs-extra'),
    fs  = require('fs'),
    path  = require('path'),
    FileSource = require('../../source'),
    define = require('../../define');

/**
	args
*/
var argsDefiniton = {
	applicationFile:  { require: true, type: 'string' },
  patternDirectory: { require: true, type: 'string' },
  objectsDirectory: { require: true, type: 'string' },
  //dataDirectory:    { require: true, type: 'string' },
  outputDirectory:  { require: true, type: 'string' }
};

module.exports = define(argsDefiniton, function(args, callback) {

  readApplicationDefinition( args.applicationFile, afterReadApplicationDefinition );

  function afterReadApplicationDefinition(err, applicationDefinition){

    addVideModuels(applicationDefinition);

    createApplication(applicationDefinition, callback);
  }

  function addVideModuels(applicationDefinition){

    if(!applicationDefinition.requiredModules){
      applicationDefinition.requiredModules = { "server": [], "client": [] };
    }

    if(!applicationDefinition.requiredModules.server){
      applicationDefinition.requiredModules.server = [];
    }

    if(!applicationDefinition.requiredModules.client){
      applicationDefinition.requiredModules.client = [];
    }

    applicationDefinition.requiredModules.server
      .push(path.resolve(__dirname + '/../../datafs'));

    applicationDefinition.requiredModules.client
      .push(path.resolve(__dirname + '/../../../client_modules/bootstrap'));

    applicationDefinition.requiredModules.client
      .push(path.resolve(__dirname + '/../../../client_modules/jquery'));

    applicationDefinition.requiredModules.client
      .push(path.resolve(__dirname + '/../../../client_modules/knockoutjs'));

    applicationDefinition.requiredModules.client
      .push(path.resolve(__dirname + '/../../../client_modules/vide'));
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
        console.log("Error:", err, list);
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
        console.log("Path", modulePath);
        fse.copy( modulePath, args.outputDirectory + '/server/'+moduleName, function(err){
          if(err) console.log("err:", modulePath, err);
          callback(err);
        }); 
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
          fse.copy( modulePath, args.outputDirectory + '/client/modules/'+moduleName, function(err){
            if(err) console.log("err:", modulePath, err);
            callback(err);
          });  
        }
      }
    }
  }

  function readApplicationDefinition(file, callback){
    fs.readFile(file, 'utf8', convertToApplicationObject);

    function convertToApplicationObject(err, fileData){
       try {
        var app = yaml.load(fileData);

        callback(null, app);
      } catch(e) {
        console.log(e.stack);
        callback(e);
      }   
    }
  }
});