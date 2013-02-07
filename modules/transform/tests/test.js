var transform = require("../src/transform");
var buster = require('buster');

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

function ObjectSource(){
	var self  = this;

	this.all = function(callback){
		var objects = [];

		objects.push({
			"js": "function DemoObj1(){}\n",
			"name": "DemoObj1"
		});

		objects.push({
			"js": "function DemoObj2(){}\n",
			"name": "DemoObj2"
		});

		callback(null, objects);
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
		],
		pageObjects: [],
		requiredModules: ['/module1/a.js']
	};

	var args = {
		page : page,
	 	patternSource: new PatternSource(),
	 	objectSource: new ObjectSource(),
	 	data: { "test": "test"}
	};

	transform( args, afterTransform );

	function afterTransform(err, page){
		console.log("DONE");
		console.log("Error:", err);
		//console.log(page.html);
		//todo
		console.log("PageJs:");
		console.log(page.js);
		test.ok(page.js);
		test.done();
	};
	//html and css paser for nodejs!
}


buster.testCase("transform", {

"exports.transformPage" : function(done){
	var page = {
		name: "test",
		elements: [
			{ name: "element1",
			  pattern: "Pattern1"
			 },
			{ name: "element2",
			  pattern: "Pattern2" }
		],
		pageObjects: []
	};

	var args = {
		page : page,
	 	patternSource: new PatternSource(),
	 	objectSource: new ObjectSource(),
	 	data: { "test": "test"}
	};

	transform( args, afterTransform );

	function afterTransform(err, page){
		console.log("DONE");
		console.log("Error:", err);
		//console.log(page.html);
		//todo
		console.log("PageJs:");
		console.log(page.js);
		assert(page.js);
		done();
	};
	//html and css paser for nodejs!
}
});
