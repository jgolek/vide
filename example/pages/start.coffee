widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'start' )
module.exports = page

page.resource
	name: "res1"
	type: types.User
	url: "/resource/res1"

page.resource
	name: "res2"
	type: types.User
	url: "/resource/res2"

page.element 
	name: "element1"
	widget: widgets.Button.with({})

page.element 
	name: "element2"
	widget: widgets.Table.with("resource:res1")

page.element 
	name: "element3"
	widget: widgets.Table.with(
			text1: "resource:res1.name"
			text2: "resource:res1.name"
			text3: "resource:res1"
			text4: "element:res1"
			text5: "static:res1"
		)

