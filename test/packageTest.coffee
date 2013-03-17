vide = require '..'

exports.testContainsClasses = (test) ->
	test.ok vide.App
	test.ok vide.Element
	test.ok vide.Page
	test.ok vide.Resource
	test.ok vide.Type


	test.done()
