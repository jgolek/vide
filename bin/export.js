#! /usr/bin/env node

var xport = require('../server_modules/export');

console.log(__dirname);

var argv = require('optimist')
	.usage('Usage: $0 --appfile <file> --patternsdir <dir> --patternsdir <dir> --objectsdir <dir> --outputdir <dir> [--	datadir <dir>]')
	.demand(['appfile', 'patternsdir', 'objectsdir', 'outputdir'])
	.argv;

var exportConfig = {
	applicationFile : argv.appfile,
	patternDirectory: argv.patternsdir,
	objectsDirectory: argv.objectsdir,
	dataDirectory:    argv.datadir,
	outputDirectory:  argv.outputdir
};
xport(exportConfig, function(err){
	if(err) console.log(err);

	console.log("Export done!");

});

