
module.exports = 
class Element
	constructor: (model) ->
		@name     = model.name ? "elementNameNotSet"
		@width    = model.width   ? 100
		@height   = model.height ? 100
		@y        = model.y ? 0
		@x        = model.x ? 0
		@border   = model.border ? 0
		@position = model.position ? "absolute"
		@widget   = model.widget ? model.bind ? html: ""

	toCss: ->
		"""
		  ##{@name} {
		     width:    #{@width}px;
		     height:   #{@height}px;
		     top:      #{@y}px;
		     left:     #{@x}px;
		     position: #{@position};
		     border:   #{@border}px solid;
		  }
		"""

	toJs: -> 
		@toJsBindings()

	toJsBindings: ->
		subscribes = []
		if( typeof(@widget.bindings) == 'string' ) 
			bindingsJs = "\n    "+@buildPath(@widget.bindings) + "()"
		else 
			bindingsJs = "\n"+( "    '#{name}': #{@buildPath(binding, name, subscribes)}" for name, binding of @widget.bindings ).join(",\n")

		"""
		  var #{@name} = new #{@widget.name}({#{bindingsJs}
		  });
		  #{@buildSubscribe(subscribes)}
		"""

	buildPath: (binding, name, subscribes) ->
		parts = binding.split ":"
		type = parts.shift()
		path = parts.join(':')
		if(type == 'resource')
			return path.split(".").join("().");
		if(type == 'static' or type == 'text')
			return "'#{path}'"
		if(type == 'element')
			paths = path.split('.')
			targetElement = paths[0]
			targetProperty = paths[1]
			subscribes.push name: name, path: path, targetElement: targetElement, targetProperty: targetProperty
			return "ko.observable()"
		if(type == 'js')
			return "#{path}"

	buildSubscribe: (subscribes) ->
		if subscribes.length == 0 then return ""

		updateFnName = 'update_'+@name
		updateFnLines = []
		updateLines = []
		subscribeLines = []
		for subscribe in subscribes
			updateFnLines.push "#{@name}.model.#{subscribe.name}(data.#{subscribe.targetProperty});"
			subscribeLines.push "#{subscribe.path}.subscribe(#{updateFnName});"
			updateLines.push "#{updateFnName}(#{subscribe.path}());"

		"""
		var #{updateFnName} = function(data){
		    #{updateFnLines.join('\n')}
		};
		#{subscribeLines.join('\n')}
		#{updateLines.join('\n')}
		"""
