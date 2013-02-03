var FileSource = require("../src/source-fs");


exports.testAll = function(test){

	var args = {
		directory: __dirname + "/data"
	}

	var demoSource = new FileSource(args);


	demoSource.all(testResult);

	function testResult(err, objects){

		console.log(objects);
		test.equal(2, objects.length);
		test.done();
	}
}
