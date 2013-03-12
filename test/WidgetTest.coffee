Widget = require '../lib/Widget'

exports.testValidate = (test) ->
	widget = new Widget 
		name: 'DemoWidget'
		model:
			property1: String
			property2: String
			property3: String

	binding = 
		property1: 'static: test1'
		property2: 'static: test2'
		property3: 'static: test3'

	widget.with binding	

	test.done()


