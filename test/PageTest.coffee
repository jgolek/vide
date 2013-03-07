Page = require '../lib/Page'

exports.testGetRequiredTypes = (test) ->
	mock1 = requiredTypes: [{t:1}, {t:2}]
	mock2 = requiredTypes: [{t:3}]

	page = new Page name: 'demo'
	page.resource
		name: "demo1"
		type: mock1
	page.resource
		name: "demo2"
		type: mock2

	test.deepEqual [ mock1, mock2 ], ( resource.type for resource in page.resources )

	test.deepEqual [{t:1}, {t:2}, {t:3}], page.getRequiredTypes() 
	test.done()
