var HtmlPageObject = require('../../src/builders/HtmlPageObject');

exports.testCreate = function(test){

	var page = {
		name: "test",
		elements: [
			{ name: "element1",
			  x: 100,
			  pattern: "Pattern1"
			 },
			{ name: "element2",
			  pattern: "Pattern2" }
		]
	};

	var args = {
		page : page,
		patternSource: new PatternSource()
	}

	HtmlPageObject(args, testCreate);

	function testCreate(err, object){

		//console.log(object.innerHtml);

		test.ok(object);
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