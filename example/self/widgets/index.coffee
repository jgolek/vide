Widget = require '../../lib/Widget'
FsWidget = require '../../lib/FsWidget'

module.exports = 
	Button: new Widget
		name: 'Button'
		viewmodel: 'function Button(){}'
		view: '<b>Button</b>'
	Table: new Widget
		name: 'Table'
		viewmodel: 'function Table(){}'
		view: '<table></table>'
	Text: new Widget
		name: 'Text'
		viewmodel: 'function Text(model){var self = this; self.model = model };'
		view: '<span data-bind="text: model.name"></span>'
	Header: new FsWidget 
		name: 'Header', directory: __dirname + '/header'

	requiredModules : [
		{ js: 'modules/bootstrap/2.3.0/bootstrap.js', css: 'modules/bootstrap/2.3.0/bootstrap.css' }
	]
