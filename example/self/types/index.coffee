Type = require '../../../lib/Type'

Schema = require('jugglingdb').Schema;
schema = new Schema('memory');

module.exports = 		
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

	Teen: new Type
		name: 'Teen'
		js: require('./Teen').toString()
		dbmodel: schema.define('Teen', {
			name: { type: String, default: 'no name' }
		})

	User: new Type
		name: 'User'
		model: {
			name: { type: String, default: 'username' }
		}

	Questionary: new Type
		name: 'Questionary'
		model: {
			name: { type: String },
			categories: { type: Schema.JSON  }
		}

	QuestionaryResult: new Type
		name: 'QuestionaryResult'
		model: {
			date: { type: String },
			teen: { type: Schema.JSON },
			user: { type: Schema.JSON }
		}

	Helper: new Type
		name: 'Helper'
		js: "function Helper(data){this.selected = ko.observable() }"
		dbmodel: schema.define('Helper', {
			name: { type: String, default: 'no name' }
		})

User = module.exports.User
User.dbmodel.create name: 'DemoUser'

Teen = module.exports.Teen
Teen.dbmodel.create name: 'DemoTeen'

Questionary = module.exports.Questionary
Questionary.dbmodel.create 
	name: 'Standard Fragebogen'
	categories: [
		{ 
			title: 'kategorie1'
			subcategories: [
				{
					title: 'subkategorie1'
					questions: [
						{
							question: 'question1', id: 'q1'
						}
					]
				}
			] 
		}
	]

