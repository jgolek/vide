App = require '../../lib/App'

app = new App

app.pages.start = require './pages/start.coffee'
app.pages.questionary1 = require './pages/questionary_teen.coffee'
app.pages.questionary2 = require './pages/questionary_user.coffee'
app.pages.questionary1_static = require './pages/questionary_teen_static.coffee'
app.pages.questionary2_static = require './pages/questionary_user_static.coffee'


app.start ->
	console.log "App started!"
