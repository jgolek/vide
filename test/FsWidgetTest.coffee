FsWidget = require '../lib/FsWidget'

exports.testNew = (test) ->
	fsWidget = new FsWidget 
		name: 'DemoWidget'
		directory: __dirname + "/widget_demo"

	test.equal 'function Widget(model){}',	fsWidget.viewmodel
	test.equal '<!-- html -->', 			fsWidget.view

	test.ok fsWidget.model.p1
	test.ok fsWidget.model.p2

	bindings = 
		p1: 'static:   test'
		p2: 'resource: test'

	fsWidget.with(bindings)

	test.done()
