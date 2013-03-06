var transformer = require("../../lib/transformers/to-page-html");

exports.testToHtml = function(test){
	var page = {
		name: "Test",
		elements: [
			{ name: "element1",
			  x: 100,
			  pattern: "Pattern1"
			 },
			{ name: "element2",
			  pattern: "Pattern2" }
		],
		requiredModules: ['module1/test.js', 'module2/test.js']
	};

	var args = {
		page : page,
		patternSource: new PatternSource()
	}

	transformer(args, testResult);

	function testResult(err, html){
		console.log(err);
		console.log(html);
		test.ok(html);
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