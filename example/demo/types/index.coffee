Type = require '../../../lib/Type'

Schema = require('jugglingdb').Schema;
schema = new Schema('memory');

module.exports = 
	User: new Type
		name: 'User'
		js: "function User(data){this.name = data.get('name') }"
		dbmodel: schema.define('User', {
			name: { type: String, default: 'user name is undefined' }
		})
		
	DemoType: new Type
		name: 'DemoType'
		js: "function DemoType(data){this.name = data.get('name') }"
		dbmodel: schema.define('DemoType', {
			propert1: { type: String, default: 'property1' },
			propert2: { type: String, default: 'property1' }
			propert3: { type: String, default: 'property1' }
			propert4: { type: String, default: 'property1' }
			propert5: { type: String, default: 'property1' }

		})


