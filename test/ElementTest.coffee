Element = require '../lib/Element'
Widget = require '../lib/Widget'

DemoWidget = new Widget name: 'DemoWidget'

exports.testToJsWithStatic = (test) ->
	elem = new Element
		name: 'elem1', 
		widget: DemoWidget.with(
			property1: 'static:foo'
			property2: 'text:bar'
		)

	expectedJs = 
	"""
	var elem1 = new DemoWidget({
	    'property1': 'foo',
	    'property2': 'bar'
	});

	"""

	test.equal expectedJs, elem.toJs()

	if( expectedJs != elem.toJs() )
		console.log expectedJs
		console.log '------------------'
		console.log elem.toJs()

	test.done()

exports.testToJsWithElement = (test) ->
	elem = new Element
		name: 'elem1', 
		widget: DemoWidget.with(
			property1: 'element:element2.hello',
			property2: 'text:bar'
		)

	expectedJs = 
	"""
	var elem1 = new DemoWidget({
	    'property1': ko.observable(),
	    'property2': 'bar'
	});
	var update_elem1 = function(data){
	    elem1.model.property1(data.hello);
	};
	element2.hello.subscribe(update_elem1);
	update_elem1(element2.hello());
	"""

	test.equals expectedJs, elem.toJs()

	if( expectedJs != elem.toJs() )
		console.log expectedJs
		console.log '------------------'
		console.log elem.toJs()
	
	test.done()
