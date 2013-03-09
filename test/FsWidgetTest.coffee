FsWidget = require '../lib/FsWidget'

exports.testNew = (test) ->
	DemoFsWidget = new FsWidget 
		name: 'DemoWidget'
		directory: __dirname + "/widget_demo"

	test.equal '//js', 			DemoFsWidget.viewmodel
	test.equal '<!-- html -->', DemoFsWidget.view
	test.done()
