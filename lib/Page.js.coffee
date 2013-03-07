

module.exports = (page) ->
	widgets = ( element.widget for element in page.elements )
	viewmodels = ( widget.viewmodel for widget in widgets ).join("\n")
	
	console.log widgets

	types =  page.getRequiredTypes()
	console.log(types);
	models = ( type.js for type in types ).join("\n")

	resourceBinding = buildBindPageModel(page.resources)

	bindings = buildPageModelBinding(page.resources, page.elements)

	"""
	//View Models 
	#{viewmodels}
	// Models
	#{models}
	// Bindings
	var pageinput = $.parseQuery(location.search);
	#{resourceBinding}

	#{bindings}
	//end
	"""

buildResouceBindings = (resource) ->
	resourceBindingsTemplate =
	"""       { url: "#{resource.url}", as: "#{resource.name}" }"""

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

	var_widget_bindings = (element.widget.buildBinding(element.name) for element in elements).join "\n"

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


"""
	  var textoutputForElement1 = new Textoutput(
	    {
	      'text': manager().name
	    }
	  );
	  
	  var listForElement2 = new List(
	    {
	      'items': houses,
	      'selectByName': pageinput.selectedItem
	    }
	  );
	  
	  var textinputForElement3 = new Textinput(
	    {
	      'text': ko.observable()
	    }
	  );
	  var updatetexttextinputForElement3 = function(data){
	    textinputForElement3.model.text(data.name);
	  };
	  listForElement2.pattern.selected.subscribe(updatetexttextinputForElement3);
	  updatetexttextinputForElement3(listForElement2.pattern.selected());
	  
	  
	  var textoutputForElement4 = new Textoutput(
	    {
	      'text': ko.observable()
	    }
	  );
	  var updatetexttextoutputForElement4 = function(data){
	    textoutputForElement4.model.text(data.name);
	  };
	  listForElement2.pattern.selected.subscribe(updatetexttextoutputForElement4);
	  updatetexttextoutputForElement4(listForElement2.pattern.selected());
	  

	  var bindings = {
	    'element1PatternInstance': textoutputForElement1,
	    'element2PatternInstance': listForElement2,
	    'element3PatternInstance': textinputForElement3,
	    'element4PatternInstance': textoutputForElement4
	  };
	  return bindings;
	}
	"""