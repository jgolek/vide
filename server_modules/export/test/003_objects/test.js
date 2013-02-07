var xport = require("../../src/export"),
    fs    = require("fs"),
    cons = require('consolidate'),
    diff = require('diff'),
    async = require('async'),
    buster = require('buster');

buster.testCase("testExportApplication", {

"exports.testExportApplication" : function(done){

	var applicationDescribtionFile = __dirname + "/app.yml";
	var exportOutputDirectory = __dirname + "/exported-app";
	var patternDirectory = __dirname + "/patterns";
	var objectsDirectory = __dirname + "/objects";
	var modulesDirectory = __dirname + "/modules/client/";
	var dataFile = __dirname + "/data.json";

	async.series({
		"exported": runExport,
		"exportedHtmlPage": getExportedHtmlPage,
		"expectedHtmlPage": getExpectedHtmlPage,
		"exportedJsPage": getExportedJsPage,
		"expectedJsPage": getExpectedJsPage
	}, testResults );

	function testResults(err, results) {
		throwIfError(err);

		var expectedHtmlPage = results.expectedHtmlPage;
		var exportedHtmlPage = results.exportedHtmlPage;
		assert(expectedHtmlPage, "expectedHtmlPage is undefined");

		assert.equals(expectedHtmlPage, exportedHtmlPage, "Compares expected with exported html page" );

		diff.diffLines(expectedHtmlPage, exportedHtmlPage).forEach(compare);


		var expectedJsPage = results.expectedJsPage;
		var exportedJsPage = results.exportedJsPage;
		assert(expectedJsPage, "expectedJsPage is undefined");

		assert.equals(expectedJsPage, exportedJsPage, "Compares expected with exported js page" );

		diff.diffLines(expectedJsPage, exportedJsPage).forEach(compare);

		function compare(diffValue){
			if(diffValue.added){
				console.log("Get:\n", diffValue.value);
			}
			if(diffValue.removed){
				console.log("Expected:\n", diffValue.value);
			}			
		}

		done();
	}

	function runExport(callback){
		var exportConfig = {
			applicationFile : applicationDescribtionFile,
			patternDirectory: patternDirectory,
			objectsDirectory: objectsDirectory,
			dataFile: dataFile,
			outputDirectory: exportOutputDirectory,
			modulesDirectory: modulesDirectory
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
}
});

function throwIfError(err){
	if(err){
		console.log(err.stack);

		throw new Error(err);
	}
}
