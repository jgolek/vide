var FileSource = require('../../../source');

var argsDefinition = {
	directory:   { type: 'string'  },
	toLowerCase: { type: 'boolean' }
};

module.exports = function(args){
	var self = this;

	var filesource = new FileSource(args);

	self.get = function(name) {
		var patternName = name.split(".")[0];
		return filesource.get(patternName + "/" + name);
	}
}

