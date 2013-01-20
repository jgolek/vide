var transform = require("../src/transform");

function PatternSource(){
	var self  = this;

	self.patterns = {
		"Pattern1": "<span>\n  test\n</span>",
		"Pattern2": "span \n  abc2"
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
			{ name: "element2" }
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
		test.done();
	}
	//html and css paser for nodejs!
};

