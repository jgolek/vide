var FileSource = require("../lib/source-fs");
var buster = require('buster');

buster.testCase("source", {

"exports.testAll" : function(done){

	var args = {
		directory: __dirname + "/data"
	}

	var demoSource = new FileSource(args);


	demoSource.all(testResult);

	function testResult(err, objects){

		console.log(objects);
		assert.equals(2, objects.length);
		done();
	}
}
});