
Widget = require '../Widget'
Type = require '../Type'

exports.test = (test) ->

	w = new Widget viewmodel: "", model: ""
	w = w.with(new Type js: "")
	#w = w.with({})

	console.log w.requiredTypes

	test.done()