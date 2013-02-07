require('sugar'); 
var transformer = require("../../lib/transformers/to-page-patterns");

exports.testToPagePatterns = function(test){
	var elements =  [
		{ name: "element1",
		  pattern: "Pattern1"
		 },
		{ name: "element2",
		  pattern: "Pattern2" }
	];

	var args = {
		elements : elements,
		patternSource: new PatternSource()
	}

	transformer(args, testResult);

	function testResult(err, patternsAsString){
		test.ok(patternsAsString);
		test.equal(4, patternsAsString.split('\n').length, "Number of Lines");
		test.ok(patternsAsString.indexOf("function Pattern1(){};") != -1 , "Result doesn't contains this string");
		test.ok(patternsAsString.indexOf("function Pattern2(){};") != -1 , "Result doesn't contains this string");
		test.done();
	}
}

function PatternSource(){
	var self  = this;

	self.patterns = {
		"Pattern1.js": "function Pattern1(){};",
		"Pattern2.js": "function Pattern2(){};"
	};

	this.get = function(name){
		return self.patterns[name];
	}
}