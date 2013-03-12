Type = require '../lib/Type'

Schema = require('jugglingdb').Schema;
schema = new Schema('memory');

exports.testCreate = (test) ->
	type = new Type 
		name: 'TestType'
		model: 
			name: { type: String }

	expectedDbModel = schema.define('TestType', {
		name: { type: String }
	});

	#test.deepEqual expectedDbModel, type.dbmodel 


	expectedJsModel = 
		"""
		function TestType(data){
		    this.id = data.id;

		    this.name = data.get('name');
		}
		"""
	test.equals expectedJsModel, type.js 
	test.done()
