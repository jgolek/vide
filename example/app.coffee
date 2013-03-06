types = require './types'
App = require '../lib/App'

app = new App

app.pages.start = require './pages/start.coffee'
console.log(app)
#app.pages.login = require './pages/login.cofee'

app.start ->
	console.log "App started!"
