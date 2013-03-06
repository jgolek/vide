Type = require '../../lib/Type'

module.exports = 
	User: new Type
		name: 'User'
		js: "function User(){}"
		definition: name: "string"