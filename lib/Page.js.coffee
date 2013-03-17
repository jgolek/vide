

module.exports = (page) ->
	widgets = ( element.widget for element in page.elements )
	viewmodels = ( widget.viewmodel for widget in widgets ).join("\n")
	
	types =  page.getRequiredTypes()
	models = ( type.js for type in types ).join("\n")

	resourceBinding = buildBindPageModel(page.resources)

	bindings = buildPageModelBinding(page.resources, page.elements)

	"""
	//View Models 
	#{viewmodels}
	// Models
	#{models}
	// Bindings
	var params = $.parseQuery(location.search);
	#{resourceBinding}

	#{bindings}
	//end
	"""

buildResouceBindings = (resource) ->

	urlParts = resource.url.split(':')
	url = urlParts[0]
	params = ""

	if urlParts.length > 1 then params = " + #{urlParts.shift(); urlParts.join(':')}"
	

	resourceBindingsTemplate =
	"""       { url: "#{url}"#{params}, as: "#{resource.name}" }"""

buildBindPageModel = (resources) -> 
	resourceBindings = "\n" + ( buildResouceBindings resource for resource in resources ).join(",\n")
	bindPageModelTemplate = 
	"""
	function buildPageModel(callback){
	  new Resources(
	    [#{resourceBindings}
	    ],
	    done
	  );

	  function done(resources){
	    var pageBindings = buildPageBindings(resources);
	    callback(pageBindings);
	  }
	}
	"""

buildVarResourceBinding = (resource) ->
	"""  var #{resource.name} = resources.getObjectOrGetList( '#{resource.name}', #{resource.type.name} );"""


buildPageModelBinding = (resources, elements) ->
	var_name_resources = "\n" + (buildVarResourceBinding resource for resource in resources).join "\n"

	var_widget_bindings = ( element.toJs() for element in elements).join "\n"

	var_bindings = buildBindings(elements)

	"""
	function buildPageBindings(resources){
	  #{var_name_resources}
	  resources.enableAutoUpdate();

	  #{var_widget_bindings}

	  #{var_bindings}

	}
	"""
buildBindings = (elements) ->
	bindings = ( """   '#{element.name}PatternInstance': #{element.name}""" for element in elements ).join (',\n')
	"""
		var bindings = {
		    #{bindings}
		};
		return bindings;
	"""
