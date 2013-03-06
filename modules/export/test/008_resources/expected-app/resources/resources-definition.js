

var Schema = require('jugglingdb').Schema;
var schema = new Schema('memory');

exports.House = schema.define(
	'House', 
	{
	    name:     { type: String, length: 255, default: ' set house name ' }
	}
);

exports.Manager = schema.define(
	'Manager',
	{
	    name:     { type: String, length: 255, default: ' set manager name ' }
	}
);