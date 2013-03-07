require('express-resource');

var importResources = require('./resources-import');

var args = {
	app: { type: 'App'},
	directory: {type: 'string'},
  model: {type: 'object'}
}
module.exports = function(args, callback){

	var app = args.app;
	var models = args.models || require(args.directory+'/resources-definition');
  var routes = buildRoutes("resource", models);

  console.log (models)

  routes.forEach(function(route){
    console.log("added route: " + route.url + " for model " + route.modelName + ". Model: " + route.model );
    var resource = app.resource(route.url, new ResourceModelAdapter(route.model, route.resourceName ));
  });

  //importResources(
  //  {
  //    directory: args.directory + '/data',
  //    models: models
  //  }
  //);  
};

function buildRoutes(baseUrl, models){
  var routes = [];
  for(var model in models){
    var route = {};
    route.url = (baseUrl + "/" + model).toLowerCase();
    route.model = models[model];
    route.modelName = model;
    route.resourceName = model.toLowerCase();
    routes.push(route);
  }
  return routes;
}

function ResourceModelAdapter( Model, resourceName ){
  var self = this;

  self.new = function(req, res){
    console.log('new');
    var instance = new Model(); 
    res.send(instance);
  };

  self.load = function(req, id, fn){
    console.log( "Find id:", typeof(id) );
    Model.find(id, fn);
  }

  self.index = function(req, res){
    console.log('index');
    console.log( "Query", req.query);


    Model.all({order: 'id', limit: 10, skip: 20, where: req.query }, function(err, all){
      res.send(all);
    });
  };

  self.create = function(req, res){
    console.log('create', req.body);
    var data = req.body;
    Model.create(data, function(err, data){
      res.send(data);
    }); 
  };

  self.show = function(req, res){
    console.log('get');
    res.send(req[resourceName]);
  };

  self.update = function(req, res){
    console.log('update', req.body);

    var newData = req.body;

    var resource = req[resourceName];

    for(var property in newData){
      resource[property] = newData[property];
    }
    resource.save(done);

    function done(err, newObject){
      res.send(newObject);
    }
  };

  self.destroy = function(req, res){
    res.send('destroy forum ' + req.params.forum);
  };
}
module.exports.ResourceModelAdapter = ResourceModelAdapter;


