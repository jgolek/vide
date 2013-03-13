Page = require '../../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'start', requiredModules: widgets.requiredModules )
module.exports = page

page.resource
	name: "teens"
	type: types.Teen
	url: "/resource/teen"	

page.resource
	name: "helper"
	type: types.Helper
	url: "/resource/helper/new"

page.resource
	name: "questionaryresult"
	type: types.QuestionaryResult
	url: "/resource/questionaryresult/new"

page.element
	name: "header"
	width: 900
	bind: widgets.Header.with( title: "text:Hello world!" )
		
page.element
	name: "user_selection"
	width: 500
	y: 150
	bind: widgets.Combobox.with( 
		objects:  'resource: teens'
		selected: 'resource: helper.selected'
	 )

page.element
	name: "start_questionary"
	width: 300
	y: 250
	bind: widgets.ButtonDefault.with( 
		name: 'static: Fragebogen starten'
		link: 'js:ko.computed(function(){ return "/questionary1?userId=1&teenId="+helper().selected().id })'
		icon: 'static:icon-edit icon-large'
	)

page.element
	name: "start_trend"
	width: 300
	y: 400
	bind: widgets.ButtonDefault.with( 
		name: 'static: Entwicklungsverlauf'
		link: 'js:ko.computed(function(){ return "/trend?teenId="+helper().selected().id })'
		icon: 'static:icon-bar-chart icon-large'
	)

page.element
	name: "user_add_delete"
	width: 500
	y: 150
	x: 500
	bind: widgets.ButtonWithAddAndDelete.with( objects: 'resource:teens' )

page.element
	name: "teen_history"
	width: 400
	y: 250
	x: 500
	bind: widgets.Table.with( 
		items: 'js:ko.computed(function(){ return helper().selected().results; })'
	)
