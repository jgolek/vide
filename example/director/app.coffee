App = require '../../lib/App'

app = new App directory: __dirname


app.start ->
	console.log "App started!"
