var fs = require('fs');
var path = require('path');

var async = require('async');
require('sugar');

var argsDefinition = {
	directory: {},
	fileType: {},
	toLowerCase: {type: 'boolean'},
	onlyWithSuffix: {type: 'string'}
};

module.exports = function(args){
	var self = this;

	self.get = function(name) {
		var fileName = args.directory + "/" + name;// + options.fileType;
		if(args.toLowerCase){
			fileName = fileName.toLowerCase();
		}
		return fs.readFileSync(fileName, "utf8");
	}

	self.all = function(callback){
		fs.readdir(args.directory, afterReadDir);

		function afterReadDir(err, files){
			console.log(files);

			var filteredFiles = files;

			if(args.onlyWithSuffix){
				console.log("only with suffix");
				filteredFiles = files.filter(function(file){ return file.endsWith(args.onlyWithSuffix); });
			}

			async.map(filteredFiles, mapFileToObject, callback);

			function mapFileToObject(file, callback){

				console.log(file);
				fs.readFile(args.directory + "/"+file, 'utf8', afterRead);

				function afterRead(err, fileContent){
					var fileParts = file.split(".");
					var name = fileParts[0];
					var type = fileParts[1];
					var result = {};

					result.name = name;
					result[type] = fileContent;
					callback(err, result);					
				};
			}
		}
	}

}