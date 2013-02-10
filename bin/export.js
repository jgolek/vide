#! /usr/bin/env node

var xport = require('../server_modules/export');

console.log(__dirname);

var argv = require('optimist')
	.usage('Usage: $0 --appfile <file> --outputdir <dir>')
	.demand(['appfile', 'outputdir'])
	.argv;

var exportConfig = {
	applicationFile : argv.appfile,
	outputDirectory:  argv.outputdir
};
xport(exportConfig, function(err){
	if(err) console.log(err);

	console.log("Export done!");

});

