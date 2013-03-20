Widget = require './Widget'
fs =  require 'fs'

dox = require 'dox'
coffeescript = require 'coffee-script'

module.exports =
class FsWidget extends Widget
	constructor: (data) ->
		if(!data.directory) then throw new Error "directory isn't set"
		super(data)

		viewfile = data.view || 'view'

		@testdata = undefined
		@view = fs.readFileSync(data.directory + '/'+viewfile+'.html', 'utf8')

		@loadJavaScript(data)

	loadJavaScript: (data) ->
		js = fs.readFileSync(data.directory + '/viewmodel.js', 'utf8')

		doxObj = dox.parseComments(js)
		viewmodelObj = doxObj[0]
		
		if doxObj.length == 2
			testcode = 'return ' + doxObj[1].code;

			@testdata = eval(coffeescript.compile(testcode))

		@name = viewmodelObj.ctx.name;
		@viewmodel = viewmodelObj.code
		for tag in viewmodelObj.tags
			parts = tag.name.split('.')
			if parts.length > 1
				@model[parts[1]] = tag.types[0];


	loadCoffeeScript: (data) ->
		cs = fs.readFileSync(data.directory + '/viewmodel.coffee', 'utf8')
		cs = cs + "\nreturn ViewModel"
		js = coffeescript.compile(cs)

		console.log js

		#js = fs.readFileSync(data.directory + '/viewmodel.js', 'utf8')

		doxObj = dox.parseComments(js)
		console.log doxObj

		viewmodelObj = doxObj[0]

		#@name = viewmodelObj.ctx.name;
		@viewmodel = "var #{@name} = " + viewmodelObj.code
		console.log @viewmodel

		for tag in viewmodelObj.tags
			parts = tag.name.split('.')
			if parts.length > 1
				@model[parts[1]] = tag.types[0];		

	#with: (bindings) ->
	#	requiredTypes = []
	#	new Widget name: @name, viewmodel: @viewmodel, view: @view, bindings: bindings, requiredTypes: requiredTypes

