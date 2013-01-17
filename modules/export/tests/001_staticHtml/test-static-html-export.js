var xport = require("../src/export"),
    fs    = require("fs"),
    cons = require('consolidate'),
    async = require('async');



exports.testExportApplication = function(test){

	var applicationDescribtionFile = __dirname + "/app_with_page_and_one_element.yaml";
	var exportOutputDirectory = __dirname + "/exported-app";

	async.series({
		"exported": runExport,
		"exportedHtmlPage": getExportedHtmlPage,
		"expectedHtmlPage": getExpectedHtmlPage
	}, testResults );

	function testResults(err, results){
		throwIfError(err);

		var expectedHtmlPage = results.expectedHtmlPage;
		var exportedHtmlPage = results.exportedHtmlPage;
		test.ok(expectedHtmlPage, "expectedHtmlPage is undefined");

		test.equal(expectedHtmlPage, exportedHtmlPage, "Compares expected with exported html page" );
		test.done();
	}

	function runExport(callback){
		var exportConfig = {
			applicationFile : applicationDescribtionFile,
			outputDirectory: exportOutputDirectory
		};
		xport(exportConfig, callback);
	}

	function getExportedHtmlPage(callback){
		fs.readFile(exportOutputDirectory + "/exported-app/page1.html", "utf8", callback);
	}

	function getExpectedHtmlPage(callback){
		cons.jade(__dirname + "/expected-app/page1.jade", { pretty: true }, callback);
	}
};

function throwIfError(err){
	if(err){
		throw new Error(err);
	}
}
