Page = require '../lib/Page'

exports.testGetRequiredTypes = (test) ->
	mock1 = requiredTypes: [{t:1}, {t:2}]
	mock2 = requiredTypes: [{t:3}]

	page = new Page name: 'demo'
	page.element
		name: "demo1"
		widget: mock1
	page.element
		name: "demo2"
		widget: mock2

	test.deepEqual [ mock1, mock2 ], page.getRequiredWidgets()

	test.deepEqual [{t:1}, {t:2}, {t:3}], page.getRequiredTypes() 
	test.done()
