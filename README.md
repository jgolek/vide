Vide 
============================


Example
----------------------------

	app.coffee
	└── pages
	    └── main.coffee
	    └── login.coffee

app.coffee

	App = require 'vide'.App
	app = new App

	app.pages.login  = require './pages/login.coffee'
	app.pages.main   = require './pages/main.coffee'

	app.start ->
		console.log "App started!"

main.coffee

	Page    = require '../../lib/Page'
	widgets = require '../widgets'
	types   = require '../types'

	page = new Page( name: 'start' )

	page.resource
		name: "res1"
		type: types.User
		url: "/resource/user"

	page.element 
		name: "element1"
		bind: widgets.Text.with("resource:res1")

	module.exports = page

Run
----------------------------

	coffee app.coffee


Application
----------------------------

Types
----------------------------
Are Also a resource!





