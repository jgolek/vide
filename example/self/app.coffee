App = require '../lib/App'

app = new App

app.pages.start = require './pages/start.coffee'
#app.pages.login = require './pages/login.cofee'

app.start ->
	console.log "App started!"
