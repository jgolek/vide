require('sugar'); 
var transformer = require("../../src/transformers/to-page-objects");

exports.testToPagePatterns = function(test){
	var args = {
		objectSource: new ObjectSource()
	}

	transformer(args, testResult);

	function testResult(err, objects) {
		test.ok(objects);
		console.log(objects);
		//test.equal(4, patternsAsString.split('\n').length, "Number of Lines");
		//test.ok(patternsAsString.indexOf("function Pattern1(){};") != -1 , "Result doesn't contains this string");
		//test.ok(patternsAsString.indexOf("function Pattern2(){};") != -1 , "Result doesn't contains this string");
		test.done();
	}
}

function ObjectSource(){
	var self  = this;

	this.all = function(callback){
		var objects = [];

		objects.push({
			"js": "function DemoObj1(){};",
			"name": "DemoObj1"
		});

		objects.push({
			"js": "function DemoObj2(){};",
			"name": "DemoObj2"
		});

		callback(null, objects);
	}
}