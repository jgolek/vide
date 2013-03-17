require('coffee-script')
var fs = require('fs')
var path = require('path')

var files = fs.readdirSync(__dirname);
var classes = {};

files.forEach(function(file){
	if(path.extname(file) == '.coffee'){
		var className = path.basename(file, '.coffee');
		classes[className] = require('./'+className);
	}
});

module.exports = classes;