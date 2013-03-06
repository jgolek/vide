var xport = require("../../"),
    fs    = require("fs"),
    cons = require('consolidate'),
    diff = require('diff'),
    async = require('async');

exports.testExportApplication = function(test){

	var applicationDescribtionFile = __dirname + "/app.yml";
	var exportOutputDirectory = __dirname + "/exported-app";

	async.series({
		"exported": runExport
	}, testResults );

	function testResults(err, results) {
		throwIfError(err);

		//todo compare modules of two directories!
		console.log('test manual');
		test.done();
	}

	function runExport(callback){
		var exportConfig = {
			applicationFile : applicationDescribtionFile,
			outputDirectory: exportOutputDirectory
		};
		xport(exportConfig, callback);
	}
};

function throwIfError(err){
	if(err){
		console.log(err);
		console.log(err.stack);
		throw new Error(err);
	}
}
