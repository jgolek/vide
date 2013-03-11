Page = require '../../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'questionary1', requiredModules: widgets.requiredModules )
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
	name: "result"
	type: types.QuestionaryResult
	url: "/resource/questionaryresult/new"

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
		editor: 'resource: teen'
	 )

page.element
	name: "questionary_questions"
	width: 920
	x: 10
	y: 230
	bind: widgets.QuestionaryQuestions.with( 
		questionary: 'resource: questionary '
		result: 'resource: result'
		link: 'static:questionary2'
		user: 'resource: user'
		teen: 'resource: teen'
	)

