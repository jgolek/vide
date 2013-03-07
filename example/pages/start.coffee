Page = require '../../lib/Page'
widgets = require '../widgets'
types   = require '../types'

page = new Page( name: 'start' )
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
	width: 500
	bind: widgets.Text.with( name: "text:hallo Welt" )
		
