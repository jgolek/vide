#! /usr/bin/env node

var argv = require('optimist')
	.usage('Usage: $0 --patternsdir <dir>')
	.demand(['patternsdir'])
	.argv;

var yaml  = require('js-yaml');
var path = require('path');
var express = require('express');
var FileSource = require('../server_modules/source');
var transformToHtml = require('../server_modules/transform/lib/transformers/to-page-html');
var transformToJs = require('../server_modules/transform/lib/transformers/to-page-js');

var fs = require('fs');

var app = express();


var patternsdir = argv.patternsdir;

app.use(express.bodyParser());
app.use(express.static(path.resolve(__dirname + "/../client_modules/")));

app.get("/data/:pattern", function(req, res){

	var patternName = req.params.pattern;

	fs.readFile(patternsdir +'/'+patternName+'/test.data.json', 'utf8', function(err, filedata){
		res.send(JSON.parse(filedata));
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

	var filePatternSourceArgs = {
	  directory : patternsdir + "/"+patternName,
	  toLowerCase: true
	};
	var patternSource = new FileSource(filePatternSourceArgs);

	var page = yaml.load(fs.readFileSync(patternsdir + "/"+patternName +"/test.page.yml", 'utf8'));

	var objectSource = new function(){
		var self = this;
		self.all = function(callback){
			var result = [
			 { 
			 	js: fs.readFileSync(patternsdir + "/"+patternName+"/test.object.js") 
			 }
			];
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

