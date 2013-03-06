var Schema = require('jugglingdb').Schema;
var schema = new Schema('memory');

exports.Foo = schema.define(
	'Foo', 
	{
	    name:     { type: String, length: 255, default: ' foo ' }
	}
);

exports.Bar = schema.define(
	'Bar',
	{
	    name:  { type: String, length: 255, default: ' bar ' },
	    fooid: { type: String, length: 255 }
	}
);