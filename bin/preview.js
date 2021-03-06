#! /usr/bin/env node

var yaml  = require('js-yaml');
var path = require('path');
var express = require('express');
var FileSource = require('../server_modules/source');
var transformToHtml = require('../server_modules/transform/lib/transformers/to-page-html');
var transformToJs = require('../server_modules/transform/lib/transformers/to-page-js');
var fs = require('fs');

var datafs = require('../server_modules/datafs');


var argv = require('optimist')
	.usage('Usage: $0 --patternsdir <dir>')
	.demand(['patternsdir'])
	.argv;

var app = express();


var patternsdir = argv.patternsdir;

app.use(express.bodyParser());
app.use(express.static(path.resolve(__dirname + "/../client_modules/")));

app.get("/data", function(req, res){
	res.send('type /data/patternName');
});

app.get("/data/:pattern", function(req, res){
	var patternName = req.params.pattern;
	if(!patternName){
		res.send('No Data: type /data/<patternName>');
		return;
	}

	datafs.init(patternsdir +'/'+patternName+'/data');

	datafs.get('', function(err, object){
		res.send(object);
	});
});

app.post("/data/:pattern/:path", function(req, res){
	var patternName = req.params.pattern;
	if(!patternName){
		res.send('No Data: type /data/<patternName>');
		return;
	}

	datafs.init(patternsdir +'/'+patternName+'/data');
	datafs.create('/data/'+req.params.path, req.body, function(){
		res.send({});
	});
});  

app.get("/:pattern.js", function(req, res){

	var patternName = req.params.pattern;

	var args = buildTransformArgs(patternName);

	transformToJs(args, function(err, js){
		res.setHeader('Content-Type', 'application/javascript');
		res.send(js);	
	});
});

app.get("/:pattern", function(req, res){

	var patternName = req.params.pattern;

	var args = buildTransformArgs(patternName);

	transformToHtml(args, function(err, html){
		res.send(html);
	});
});

function buildTransformArgs(patternName){

	console.log("Get Pattern: ", patternName);

	var filePatternSourceArgs = {
	  directory : patternsdir + "/"+patternName,
	  toLowerCase: true
	};
	var patternSource = new FileSource(filePatternSourceArgs);

	var page = yaml.load(fs.readFileSync(patternsdir + "/"+patternName +"/test.page.yml", 'utf8'));

	var objectSource = new function(){
		var self = this;
		self.all = function(callback){
			var result = [];
			try{
				result.push(
				 { 
				 	js: fs.readFileSync(patternsdir + "/"+patternName+"/test.object.js") 
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

