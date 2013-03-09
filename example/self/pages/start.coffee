Page = require '../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'start', requiredModules: widgets.requiredModules )
module.exports = page

page.resource
	name: "users"
	type: types.User
	url: "/resource/user"

page.resource
	name: "userNew"
	type: types.User
	url: "/resource/user/new"

page.element
	name: "element1"
	width: 900
	bind: widgets.Header.with( title: "text:Hello world!" )
		
page.element
	name: "element2"
	width: 500
	y: 200
	bind: widgets.Text.with( name: "text:hallo Welt" )


