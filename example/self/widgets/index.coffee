Widget = require '../../../lib/Widget'
FsWidget = require '../../../lib/FsWidget'

module.exports = 

	Header: new FsWidget 
		name: 'Header', directory: __dirname + '/header'

	Combobox: new FsWidget 
		name: 'Combobox', directory: __dirname + '/combobox'

	Table: new FsWidget 
		name: 'Table', directory: __dirname + '/table'

	ButtonWithAddAndDelete: new FsWidget 
		name: 'ButtonWithAddAndDelete', directory: __dirname + '/buttons/CreateAndDelete'

	ButtonDefault: new FsWidget 
		name: 'ButtonDefault', directory: __dirname + '/buttons/Default'

	ButtonLink: new FsWidget 
		name: 'ButtonLink', directory: __dirname + '/buttons/Link'

	QuestionaryQuestions: new FsWidget 
		name: 'QuestionaryQuestions', directory: __dirname + '/questionary/questions'

	QuestionaryQuestionsStatic: new FsWidget 
		name: 'QuestionaryQuestionsStatic', directory: __dirname + '/questionary/questions', view: 'view_static'

	QuestionaryHeader: new FsWidget 
		name: 'QuestionaryHeader', directory: __dirname + '/questionary/header'

	QuestionaryHeaderStatic: new FsWidget 
		name: 'QuestionaryHeaderStatic', directory: __dirname + '/questionary/header_static'

	LineChart: new FsWidget 
		name: 'LineChart', directory: __dirname + '/highcharts/line'

	requiredModules : [
		js: "modules/highcharts-2.3.5/js/highcharts.js"
	]
