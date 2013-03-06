Resource = require './Resource'

module.exports =
class Widget
	constructor: (data) ->
		@name = data.name
		@viewmodel = data.viewmodel
		@view = data.view
		@model = data.model
		@requiredTypes = data.requiredTypes ? []

	with: (model) ->
		requiredTypes = []
		if(model instanceof Resource)
			requiredTypes.push model.type
		
		new Widget name: @name, viewmodel: @viewmodel, view: @view, model: model, requiredTypes: requiredTypes


	buildBinding: (elementName) ->
		if( typeof(@model) == 'string' ) 
			bindings = "\n    "+@buildPath(@model) + "()"
		else 
			bindings = "\n"+( "    '#{name}': #{@buildPath(binding)}" for name, binding of @model ).join(",\n")
			bindings = "\n"+
				"""{#{bindings}
				  }"""	
		
		"""
		  var #{elementName} = new #{@name}(#{bindings}  
		  );
		"""
	  #'text': manager().name
	
	buildPath: (binding) ->
		parts = binding.split ":"
		type = parts[0]
		path = parts[1]
		if(type == 'resource')
			return path.split(".").join("().");
		if(type == 'static')
			return "'#{path}'"
		if(type == 'element')
			return "todo"

