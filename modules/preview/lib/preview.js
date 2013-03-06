
var yaml  = require('js-yaml');
var path = require('path');
var express = require('express');
var FileSource = require('../../../server_modules/source');
var transformToHtml = require('../../../server_modules/transform/lib/transformers/to-page-html');
var transformToJs = require('../../../server_modules/transform/lib/transformers/to-page-js');
var fs = require('fs');
var ResourceModelAdapter = require('../../../server_modules/resource').ResourceModelAdapter;
console.log(require('../../../server_modules/resource'));

var argv = require('optimist')
	.usage('Usage: $0 --widgetsdir <dir> --clientmodules <dir>')
	.demand(['widgetsdir', 'clientmodules'])
	.argv;

var directory = argv.widgetsdir;
var modulesDirectory = argv.clientmodules;

var app = express();
app.use(express.bodyParser());
app.use(express.static(path.resolve(modulesDirectory)));

app.get("/resource/:widget", buildWidgetModel );
app.get("/:widget.html", buildWidgetView );
app.get("/:widget.js", buildWidgetViewModel );
app.get("/:widget", buildWidgetView );


function buildWidgetModel(req, res){

	var widgetName = req.params.widget;

	if(widgetName == 'favicon.ico'){
		return;
	}
	var resourceAdapter = initResource(widgetName);
	resourceAdapter.index(req, res);
}

var Schema = require('jugglingdb').Schema;
var schema = new Schema('memory');
var resources = {};
function initResource(resourceName){
	var modelDefinition = JSON.parse(fs.readFileSync(directory+"/"+resourceName+"/model.def.json", "utf8"));
	var Model = schema.define( resourceName, modelDefinition );

	try{
	var modelData = JSON.parse(fs.readFileSync(directory+"/"+resourceName+"/model.data.json", "utf8") || {});
	if(modelData instanceof Array){
		modelData.forEach(function(data){
			Model.create(data);
		});
	}else{
		odel.create(modelData);
	}
	}catch(ex){
		//ignore
	}


	var resourceAdapter = new ResourceModelAdapter( Model, resourceName );
	var resource = app.resource("resource/"+resourceName, resourceAdapter);
	console.log('add route: ', "/resource/"+resourceName);
	return resourceAdapter;
}

function buildWidgetViewModel(req, res){

	var widgetName = req.params.widget;

	var args = buildTransformArgs(widgetName);

	transformToJs(args, function(err, js){
		res.setHeader('Content-Type', 'application/javascript');
		res.send(js);	
	});
}

function buildWidgetView(req, res){

	var widgetName = req.params.widget;
	initResource(widgetName);

	var args = buildTransformArgs(widgetName);

	transformToHtml(args, function(err, html){
		console.log(err, html);
		res.send(html);
	});
	//buildWidgetModel(widgetName);
}

function buildTransformArgs(widgetName){

	console.log("Get Pattern: ", widgetName);

	var filePatternSourceArgs = {
	  directory : directory + "/"+widgetName,
	  toLowerCase: true
	};
	//var patternSource = new FileSource(filePatternSourceArgs);
	var patternSource = {
		get: function(name) { 

			var nameParts = name.split('.');
			var widgetName = nameParts[0];
			var widgetType = nameParts[1];

			if(widgetType == "html"){
				var html = fs.readFileSync(directory + "/"+widgetName+"/view.html", 'utf8');
				console.log('html', html);
				return html;
			}

			if(widgetType == "js"){
				var js = fs.readFileSync(directory + "/"+widgetName+"/viewmodel.js", 'utf8');
				console.log('js', js);
				return js;
			}

			throw new Error("type not supported: " +widgetType + " for name " + name);
		}
	}

	var page = yaml.load(fs.readFileSync(directory + "/"+widgetName +"/test.page.yml", 'utf8'));

	if(!page){
		page = {};
	}

	if(!page.name){
		page.name = widgetName;
	}

	if(!page.elements){
		page.elements = [{
			name: "element1",
			x: 0,
			y: 1,
			width: 940,
			height: 100,
			border: 0,
			pattern: widgetName
		}];
	}

	if(page.elements[0] && !page.elements[0].name){
		page.elements[0].name = "element1";
	}

	if(page.elements[0] && !page.elements[0].x){
		page.elements[0].x = 0;
	}

	if(page.elements[0] && !page.elements[0].y){
		page.elements[0].y = 0;
	}

	if(page.elements[0] && !page.elements[0].width){
		page.elements[0].width = 500;
	}

	if(page.elements[0] && !page.elements[0].height){
		page.elements[0].height = 500;
	}

	if(page.elements[0] && !page.elements[0].pattern){
		page.elements[0].pattern = widgetName;
	}

    if(!page.requiredModules){
      page.requiredModules = [];
    }

    page.requiredModules.push({ js: 'knockoutjs/knockout-2.1.0.js' });
    page.requiredModules.push({ js: 'jquery/jquery-1.7.1-min.js' });
    page.requiredModules.push({ js: 'jquery/jquery.parsequery.js' });
    page.requiredModules.push({ js: 'resource/lib/resource-client.js' });
    page.requiredModules.push({ js: 'bootstrap/2.3.0/bootstrap.js',
                                css:'bootstrap/2.3.0/bootstrap.css' });
    page.requiredModules.push({ css:'bootstrap/2.3.0/font-awesome.css' });
    page.requiredModules.push({ js :'vide/knockout-with-jquery.js' });


	var objectSource = new function(){
		var self = this;

		self.all = function(callback){
			var result = [];
			var json = JSON.parse(fs.readFileSync(directory + "/"+widgetName+"/model.def.json", 'utf8'));
			console.log("JSON", json);
			try{
				result.push(
				 { 
				 	//fs.readFileSync(directory + "/"+widgetName+"/test.object.js"),
				 	name: widgetName,
				 	json: json
				 }
				);
			}catch(exc){
				console.log('WARN: ', exc);
			}
			callback(null, result);
		}
	};

	var args = {
		page: page,
		patternSource: patternSource,
		objectSource: objectSource
	}

	return args;
}

app.listen(3000, function(){
	console.log("started pattern preview");
});

