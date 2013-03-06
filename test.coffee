
console.log 'hello'
#express = require 'express'
#app = express()
#app.listen 3001, -> console.log 'start'

widgets = { Header: (x) -> console.log x }

types = { User: (x) -> console.log x }

start = name: start, elements: {}
start.elements.header = 
	height: 50
	widget: 
		widgets.Header.with {
			title: "Läuft!"
		}

start.elements.selection = 
	y: 80
	widget: widgets.Combobox { 
		items: resources.users
		selection: start.selectedUser
	}

resources.users = new Resource
	type: User
	url : "/resources/users"


generate start



