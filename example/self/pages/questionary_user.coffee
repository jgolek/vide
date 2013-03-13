Page = require '../../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'questionary2', requiredModules: widgets.requiredModules )
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
	width: 920
	x: 10
	y: 80
	bind: widgets.QuestionaryHeader.with( 
		teen: 'resource: teen'
		editor: 'resource: user'
		alertType: 'static:success'
		link: 'static:start'
		pretext: 'text: Auszufüllen von'
	 )

page.element
	name: "questionary_questions"
	width: 920
	x: 10
	y: 230
	bind: widgets.QuestionaryQuestions.with( 
		questionary: 'resource: questionary '
		result: 'resource: lastResult'
		link: 'static:start'
		user: 'resource: user'
		teen: 'resource: teen'
		editable: 'static:true'
		editor: 'static:user'
		nextText: 'static:abschließen'
	)
