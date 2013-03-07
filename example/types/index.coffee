Type = require '../../lib/Type'

Schema = require('jugglingdb').Schema;
schema = new Schema('memory');

module.exports = 
	User: new Type
		name: 'User'
		js: "function User(data){this.name = data.get('name') }"
		dbmodel: schema.define('User', {
			name: { type: String, default: 'user name is undefined' }
		})


