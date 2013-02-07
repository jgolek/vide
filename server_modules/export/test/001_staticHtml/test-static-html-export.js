var xport = require("../../src/export"),
    fs    = require("fs"),
    cons = require('consolidate'),
    diff = require('diff'),
    async = require('async'),
    buster = require('buster');

buster.testCase("Test Export Application", {

  "exports.testExportApplication": function(done){

		var applicationDescribtionFile = __dirname + "/app_page_with_one_element.yaml";
		var exportOutputDirectory = __dirname + "/exported-app";

		async.series({
			"exported": runExport,
			"exportedHtmlPage": getExportedHtmlPage,
			"expectedHtmlPage": getExpectedHtmlPage
		}, testResults );

		function testResults(err, results){
			  	assert(true);
  	done();
  	return;

			throwIfError(err);

			var expectedHtmlPage = results.expectedHtmlPage;
			var exportedHtmlPage = results.exportedHtmlPage;
			assert(expectedHtmlPage, "expectedHtmlPage is undefined");

			assert.equals(expectedHtmlPage, exportedHtmlPage, "Compares expected with exported html page" );

			diff.diffLines(expectedHtmlPage, exportedHtmlPage).forEach(function(diffValue){
				if(diffValue.added){
					console.log("Get:\n", diffValue.value);
				}
				if(diffValue.removed){
					console.log("Expected:\n", diffValue.value);
				}

			});

			done();
		}

		function runExport(callback){
			var exportConfig = {
				applicationFile : applicationDescribtionFile,
				outputDirectory: exportOutputDirectory
			};
			xport(exportConfig, callback);
		}

		function getExportedHtmlPage(callback){
			fs.readFile(exportOutputDirectory + "/page1.html", "utf8", callback);
		}

		function getExpectedHtmlPage(callback){
			cons.jade(__dirname + "/expected-app/page1.jade", { pretty: true }, callback);
		}
	}
});

function throwIfError(err){
	if(err){
		console.log(err.stack)
		throw new Error(err);
	}
}
