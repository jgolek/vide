var async = require('async');

var toPatterns = require('./to-page-patterns');
var toObjects = require('./to-page-objects');
var toPageBindings = require('./to-page-binding');

module.exports = function(globalArgs, callback){

	async.parallel(
		{
			patterns:        buildPatterns,
			objects:         buildObjects,
			pageBindings:    buildPageBindings
		}, 
	  buildPageJs
	);

	function buildPageJs(err, result){
		var pageJs = "//header\n";
		pageJs += result.patterns+"\n";
		pageJs += result.objects+"\n";
		pageJs += result.pageBindings+"\n";

		callback(err, pageJs);
	}

	function buildPatterns(callback){
		var args = {
			elements: globalArgs.page.elements,
			patternSource: globalArgs.patternSource
		}

		toPatterns(args, callback);
	}

	function buildObjects(callback){
		toObjects(globalArgs, callback);
	}

	function buildPageBindings(callback){

		console.log(globalArgs.page);

		var args = {
			elements: globalArgs.page.elements,
			data: globalArgs.data,
			pageObjects: globalArgs.page.pageObjects
		}

		toPageBindings(args, callback);
	}

}
