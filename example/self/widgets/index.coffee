Widget = require '../../../lib/Widget'
FsWidget = require '../../../lib/FsWidget'

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
	Combobox: new FsWidget 
		name: 'Combobox', directory: __dirname + '/combobox'
	ButtonWithAddAndDelete: new FsWidget 
		name: 'ButtonWithAddAndDelete', directory: __dirname + '/buttons/CreateAndDelete'

	ButtonDefault: new FsWidget 
		name: 'ButtonDefault', directory: __dirname + '/buttons/Default'

	QuestionaryQuestions: new FsWidget 
		name: 'QuestionaryQuestions', directory: __dirname + '/questionary/questions'
	QuestionaryHeader: new FsWidget 
		name: 'QuestionaryHeader', directory: __dirname + '/questionary/header'

	requiredModules : []
