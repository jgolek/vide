Page = require '../../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'trend', requiredModules: widgets.requiredModules )
module.exports = page

page.resource
	name: "teen"
	type: types.Teen
	url: "/resource/teen/:params.teenId"

page.resource
	name: "results"
	type: types.QuestionaryResult
	url: "/resource/questionaryresult?teenId=:params.teenId"

page.resource
	name: "helper"
	type: types.Helper
	url: "/resource/helper/new"

page.element
	name: "header"
	width: 900
	bind: widgets.Header.with( title: "text:Hello world!" )
		
page.element
	name: "chart_area"
	width: 900
	y: 100
	bind: widgets.LineChart.with( 
		title:  'js:(function(){ return "Entwicklungsverlauf von "+teen().name() })()'
		ytitle: 'text:Punkte'
		series: 'js:(function(){ return helper().toChartSeries(results()); })()'
	 )
