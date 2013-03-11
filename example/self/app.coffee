App = require '../../lib/App'

app = new App

app.pages.start = require './pages/start.coffee'
app.pages.questionary1 = require './pages/questionary_teen.coffee'
app.pages.questionary2 = require './pages/questionary_user.coffee'


app.start ->
	console.log "App started!"
