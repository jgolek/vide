var xport = require("../../src/export"),
    fs    = require("fs"),
    cons = require('consolidate'),
    diff = require('diff'),
    async = require('async');



exports.testExportApplication = function(test){

	var applicationDescribtionFile = __dirname + "/app.yml";
	var exportOutputDirectory = __dirname + "/exported-app";
	var patternDirectory = __dirname + "/patterns";
	var modulesDirectory = __dirname + "/modules/client/";


	async.series({
		"exported": runExport,
		"exportedHtmlPage": getExportedHtmlPage,
		"expectedHtmlPage": getExpectedHtmlPage,
		"exportedJsPage": getExportedJsPage,
		"expectedJsPage": getExpectedJsPage
	}, testResults );

	function testResults(err, results) {
		console.log("err");
		throwIfError(err);

		var expectedHtmlPage = results.expectedHtmlPage;
		var exportedHtmlPage = results.exportedHtmlPage;
		test.ok(expectedHtmlPage, "expectedHtmlPage is undefined");

		test.equal(expectedHtmlPage, exportedHtmlPage, "Compares expected with exported html page" );

		diff.diffLines(expectedHtmlPage, exportedHtmlPage).forEach(compare);


		var expectedJsPage = results.expectedJsPage;
		var exportedJsPage = results.exportedJsPage;
		test.ok(expectedJsPage, "expectedJsPage is undefined");

		test.equal(expectedJsPage, exportedJsPage, "Compares expected with exported js page" );

		diff.diffLines(expectedJsPage, exportedJsPage).forEach(compare);

		function compare(diffValue){
			if(diffValue.added){
				console.log("Get:\n", diffValue.value);
			}
			if(diffValue.removed){
				console.log("Expected:\n", diffValue.value);
			}			
		}

		test.done();
	}

	function runExport(callback){
		var exportConfig = {
			applicationFile : applicationDescribtionFile,
			patternDirectory: patternDirectory,
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
};

function throwIfError(err){
	if(err){
		console.log(err.stack);

		throw new Error(err);
	}
}
