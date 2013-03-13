Page = require '../../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'questionary_static', requiredModules: widgets.requiredModules )
module.exports = page

page.resource
	name: "questionary"
	type: types.Questionary
	url: "/resource/questionary/1"

page.resource
	name: "teen"
	type: types.Teen
	url: "/resource/teen/:params.teenId"

page.resource
	name: "user"
	type: types.User
	url: "/resource/user/:params.userId"

page.resource
	name: "lastResult"
	type: types.QuestionaryResult
	url: "/resource/questionaryresult/:params.resultId"

page.resource
	name: "helper"
	type: types.Helper
	url: "/resource/helper/new"

page.element
	name: "header"
	width: 900
	bind: widgets.Header.with( title: "text: " )
		
page.element
	name: "questionary_header"
	width: 890
	x: 10
	y: 80
	bind: widgets.QuestionaryHeaderStatic.with( 
		teen: 'resource: teen'
		editor: 'resource: teen'
		date: 'resource: lastResult.date'
	 )

page.element
	name: "switch_to_user"
	width: 150
	height: 30
	y: 150
	x: 745
	bind: widgets.ButtonLink.with( 
		name: 'static: zum Mitarbeiter'
		link: 'js:ko.computed(function(){ return "/questionary2_static?userId=1&teenId="+teen().id+"&resultId="+lastResult().id })'
	)

page.element
	name: "questionary_questions"
	width: 890
	x: 10
	y: 230
	bind: widgets.QuestionaryQuestions.with( 
		questionary: 'resource: questionary '
		result: 'resource: lastResult'
		link: 'static:start'
		user: 'resource: user'
		teen: 'resource: teen'
		editable: 'static:false'
		editor: 'static:teen'
	)
