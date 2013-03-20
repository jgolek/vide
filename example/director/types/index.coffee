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
			date:   { type: String },
			teenId: { type: String },
			teen:   { type: Schema.JSON },
			user:   { type: Schema.JSON },
			userId: { type: String }
		}

	Helper: new Type
		name: 'Helper'
		js: require('./Helper').toString()
		dbmodel: schema.define('Helper', {
			name: { type: String, default: 'no name' }
		})

User = module.exports.User
User.dbmodel.create name: 'DemoUser'

Teen = module.exports.Teen
Teen.dbmodel.create name: 'DemoTeen'

QuestionaryResult = module.exports.QuestionaryResult
QuestionaryResult.dbmodel.create
	teenId: 1
	userId: 1
	date: 'Wed Mar 12 2013 14:58:23'
	teen: { q1: "c" }
	user: { q1: "b" }

QuestionaryResult.dbmodel.create
	teenId: 1
	userId: 1
	date: 'Wed Mar 13 2013 14:58:23'
	teen: { q1: "a" }
	user: { q1: "a" }

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

