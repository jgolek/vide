var transformer = require("../../src/transformers/to-page-binding");

exports.testToJs = function(test){
	var elements = [
		{ name: "element1",
		  x: 100,
		  pattern: "Pattern1",
		  patterndata: {
		  	text1: { type: "static", value: "demodata" },
		  	text2: { type: "domain", value: "demo.app" },
		  	text3: { type: "element", value: "element2.selected.name" },
		  	text4: { type: "element", value: "element2.selected" }

		  }
		},
		{ name: "element2",
		  pattern: "Pattern2" }
	];

	var args = {
		elements : elements,
		patternSource: new PatternSource(),
		data: { 'testdata': { 'name': 'test' } }
	}

	transformer(args, testResult);

	function testResult(err, js){
		console.log(err);
		console.log(js);
		test.ok(js);
		test.done();
	}
}

function PatternSource(){
	var self  = this;

	self.patterns = {
		"Pattern1.html": "<span>\n  test\n</span>",
		"Pattern1.js": "function Pattern1(){};",
		"Pattern2.html": "span \n  abc2",
		"Pattern2.js": "function Pattern2(){};",
	};

	this.get = function(name){
		return self.patterns[name];
	}
}