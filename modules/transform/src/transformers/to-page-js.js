
var toPatterns = require('to-page-patterns');
var toObjects = require('to-page-objects');
var toElementBindings = require('to-page-element-bindings');
var toPageBindings = require('to-page-bindings');

module.exports = function(args, callback){

	async.pararell(
		{
			patterns:        buildPatterns,
			objects:         buildObjects,
			elementBindings: buildElementBindings,
			pageBindings:    buildPageBindings
		}, 
	  buildPageJs
	);

	function buildPageJs(err, result){
		var pageJs = "//header";
		pageJs += result.patterns;
		pageJs += result.objects;
		pageJs += result.elementBindings;
		pageJs += result.pageBindings;

		callback(err, pageJs);
	}


	function buildPatterns(callback){

		
		
	}


}
