var xport = require("../../src/export"),
    fs    = require("fs"),
    cons = require('consolidate'),
    diff = require('diff'),
    async = require('async');

exports.testExportApplication = function(test){

	var applicationDescribtionFile = __dirname + "/app.yml";
	var exportOutputDirectory = __dirname + "/exported-app";
	var patternDirectory = __dirname + "/patterns";
	var objectsDirectory = __dirname + "/objects";
	var modulesDirectory = __dirname + "/modules/client/";
	var dataDirectory = __dirname + "/data/";

	async.series({
		"exported": runExport
		//"exportedHtmlPage": getExportedHtmlPage,
		//"expectedHtmlPage": getExpectedHtmlPage,
		//"exportedJsPage": getExportedJsPage,
		//"expectedJsPage": getExpectedJsPage
	}, testResults );

	function testResults(err, results) {
		throwIfError(err);

		//todo compare modules of two directories!
		console.log('test manually');


		test.done();
	}

	function runExport(callback){
		var exportConfig = {
			applicationFile : applicationDescribtionFile,
			patternDirectory: patternDirectory,
			objectsDirectory: objectsDirectory,
			dataDirectory:    dataDirectory,
			modulesDirectory: modulesDirectory,
			outputDirectory: exportOutputDirectory
		};
		xport(exportConfig, callback);
	}

	function getExportedHtmlPage(callback){
		fs.readFile(exportOutputDirectory + "/page1.html", "utf8", callback);
	}

	function getExpectedHtmlPage(callback){
		fs.readFile(__dirname + "/expected-app/page1.html", "utf8", callback);
	}

	function getExportedJsPage(callback){
		fs.readFile(exportOutputDirectory + "/page1.js", "utf8", callback);
	}

	function getExpectedJsPage(callback){
		fs.readFile(__dirname + "/expected-app/page1.js", "utf8", callback);
	}
};

function throwIfError(err){
	if(err){
		console.log(err);
		console.log(err.stack);
		throw new Error(err);
	}
}
