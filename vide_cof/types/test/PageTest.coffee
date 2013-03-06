Page = require '../Page'
Widget = require '../Widget'
Type = require '../Type'

#widget factory

widgets = {}
widgets.Button = new Widget
  name: "Button"
	viewmodel: "function Button()"
	view: "<b></b>"

widgets.Table = new Widget
  name: "Table"
	viewmodel: "function Table()"
	view: "<table></table>"

types = {}
types.User = new Type
	name: "User"
	js: "function User(){}"
	definition: name: "string"

#resources.users = new Resource
#	type: [types.User]
#	url: "/resources/users"

#resources.newUser = new Resource
#	type: types.User
#	url: "/resources/users/new"

#console.log Button
#console.log("viewmodel", new Button().viewmodel );

exports.testHtml = (test) ->

	page = new Page( { name: 'demo' } )

	page.resource
		name: "res1"
		type: types.User
		url: "/resource/res1"

	page.resource
		name: "res2"
		type: types.User
		url: "/resource/res2"

	page.element 
		name: "element1"
		widget: widgets.Button.with({})

	page.element 
		name: "element2"
		widget: widgets.Table.with("resource:res1")

	page.element 
		name: "element3"
		widget: widgets.Table.with(
				text1: "resource:res1.name"
				text2: "resource:res1.name"
				text3: "resource:res1"
				text4: "element:res1"
				text5: "static:res1"
			)

	#console.log page.toHtml()
	console.log page.toJs()

	#test.equals( page.toHtml(), expectedHtml );
	#test.equals( page.toJs(),  expectedJs );

	test.done()

expectedHtml = 
"""
<!DOCTYPE html>
<html>
  <head>
    <title>demo</title>
    <style type="text/css">
      .container {
        position: relative;
      }
      
    </style>
    <style type="text/css">
      
      
    </style>
  </head>
  <body>
    <div class="container">
    </div>
  </body>
  <script>
    var bindings = buildPageModel(applyBindings);
    function applyBindings(bindings){
      ko.applyBindings(bindings);
    }
  </script>
</html>
"""

expectedJs = 
"""
<!DOCTYPE html>
<html>
  <head>
    <title>demo</title>
    <style type="text/css">
      .container {
        position: relative;
      }
      
    </style>
    <style type="text/css">
      
      
    </style>
  </head>
  <body>
    <div class="container">
    </div>
  </body>
  <script>
    var bindings = buildPageModel(applyBindings);
    function applyBindings(bindings){
      ko.applyBindings(bindings);
    }
  </script>
</html>
"""
