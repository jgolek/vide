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

	app.start ->
		console.log "App started!"

main.coffee
    vide    = require 'vide'
	Page    = vide.Page
	widgets = require '../widgets'
	types   = require '../types'

	page = new Page( name: 'start' )

	page.helper = -> 

	page.resource
		name: "res1"
		type: types.User
		url: "/resource/user"

	page.element 
		name: "element1"
		bind: widgets.Text.with(
				text: -> element1.test
			)

	module.exports = page

Run
----------------------------

	coffee app.coffee

	http://localhost:3000/

Application
----------------------------

Pages and Elements
----------------------------
Element

	page.element
		name: "element1"
		bind: widgets.Text.with("resource:res1")
	page.element
		name: "element2"
		bind: widgets.Text, with: {
			property1: "text:hello world"
			property2: "resource:res1"
			property3: "element:element1.text"
		}

Bindings (syntax:'binding':'value' ) 

- text: text 
- resource: resource name
- element: element name

Resource

	page.resource
		name: "user1"
		type: types.User
		url: "/resource/user/1"

	page.resource
		name: "user2"
		type: types.User
		url: "/resource/user/:params.param1"

	page.resource
		name: "user3"
		type: types.User
		url: "/resource/user/:params.param2"


Url Params: 
eg. 
	/<page>?param1=foo&param2=bar


Widgets
----------------------------
TODO

	< widget name >
    ├── view.html
    └── viewmodel.js

Viewmodel( e.g Table )

	/**
	 * Table 
	 *
	 * @param {[Object]} model.items
	 * @param {[String]} model.header
	 */
	function Table(model){
		this.items = model.items
		this.header = model.header
	};

ViewModel and Html Element Binding

	to get access to th the html Element where this is bind to then add an init method. 
	this is usfull if you want to use jquery and other 

		function Table(model){
			this.init = function(htmlElement){

			}
		};
View
	html


Types
----------------------------
TODO


Development
---------------------------

	nodemon -e .coffee -w . -x coffee app.coffee




