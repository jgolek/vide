Page = require '../lib/Page'

exports.testGetRequiredTypes = (test) ->
	mockType3 = name: 't3'
	mockType2 = name: 't2', requiredTypes: [mockType3]
	mockType1 = name: 't1', requiredTypes: [mockType2, mockType3]

	page = new Page name: 'demo'
	page.resource
		name: "demo1"
		type: mockType1
		url: "/"
	page.resource
		name: "demo2"
		type: mockType3
		url: "/"

	test.deepEqual [ mockType1, mockType3 ], ( resource.type for resource in page.resources )

	test.deepEqual [ mockType1, mockType2, mockType3 ], page.getRequiredTypes() 
	test.done()

exports.testToHml = (test) ->
	mockType1 = name: 't1'
	page = new Page name: 'demo'
	page.resource
		name: "demo1"
		type: mockType1
		url: "/"

	page.element
		name: "element1"

	test.ok page.toHtml()

	test.done()