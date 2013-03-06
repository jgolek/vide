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
	app.pages.main   = require './pages/main.cofee'

	app.start ->
		console.log "App started!"

start.cofee

	Page    = require '../../lib/Page'
	widgets = require '../widgets'
	types   = require '../types'

	page = new Page( name: 'start' )

	page.resource
		name: "res1"
		type: types.User
		url: "/resource/res1"

	page.element 
		name: "element1"
		widget: widgets.Table.with("resource:res1")

	module.exports = page

Run
----------------------------

	coffee app.coffee



