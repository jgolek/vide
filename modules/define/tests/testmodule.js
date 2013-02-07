var define = require('../lib/define');

var argsDefinition = {
	foo: 'string'
}

module.exports = define(argsDefinition, function(args, callback){
	//do something;
	//console.log(args);
	callback(null, args);
});