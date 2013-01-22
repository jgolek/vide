var transform = require("../src/transform");

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

exports.transformPage = function(test){
	var page = {
		name: "test",
		elements: [
			{ name: "element1",
			  pattern: "Pattern1"
			 },
			{ name: "element2",
			  pattern: "Pattern2" }
		]
	};

	var app = {
		page : page,
	 	patternSource: new PatternSource()
	};

	transform( app, afterTransform );

	function afterTransform(err, page){
		console.log(err);
		//console.log(page.html);
		//todo
		console.log(page.js);
		test.ok(page.js);
		test.done();
	};
	//html and css paser for nodejs!
};
