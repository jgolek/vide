Widget = require '../../lib/Widget'

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
