var fs = require('fs');

var argsDefinition = {
	directory: {},
	fileType: {},
	toLowerCase: {type: 'boolean'}
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
}