argv = require('optimist')
    .usage('Usage: $0 -d [dir]')
    .demand(['d'])
    .argv

WidgetApp = require './lib/WidgetApp'

app = new WidgetApp directory: argv.d

app.start ->
	console.log "App started!"