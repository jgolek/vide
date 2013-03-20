Page = require '../../../lib/Page'

delete require.cache[require.resolve('../widgets')]
delete require.cache[require.resolve('../types')]


widgets = require '../widgets'
types   = require '../types'

console.log require.cache

page = new Page( name: 'start', requiredModules: widgets.requiredModules )
module.exports = page
	
page.element
	name: "resourcesList"
	width: 100
	height: 100
	y: 100
	x: 300
	bind: widgets.List.with( items: '')




