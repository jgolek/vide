var FileSource = require("../lib/source-fs");

exports.testAll = function(test){
	var args = {
		directory: __dirname + "/data"
	}

	var demoSource = new FileSource(args);

	demoSource.all(testResult);

	function testResult(err, objects){
		console.log(objects);
		test.equals(3, objects.length);
		test.done();
	}	
}


exports.testAllWithSuffix = function(test){
	var args = {
		directory: __dirname + "/data",
		onlyWithSuffix: "client.js"
	}

	var demoSource = new FileSource(args);

	demoSource.all(testResult);

	function testResult(err, objects){
		console.log(objects);
		test.equals(1, objects.length);
		test.done();
	}	
}