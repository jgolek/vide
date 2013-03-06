jade = require 'jade'

compiledTemplate = jade.compile( template, pretty: true )

module.exports = (page) ->
	compiledTemplate(page: this, indent: indent)


elementsAsCss = ->
	lines = ( element.toCss() for element in @elements ) 
	lines.join '\n'

indent =  (str, prefix) -> "#{prefix}#{str}"	

template =
'''
doctype 5
html
  head
    title= page.name
    - var cssElements = indent(page.elementsAsCss(), '    ')

    style(type='text/css')
      .container {
        position: relative;
      }

    style(type='text/css')
      !{cssElements}

    each module in page.requiredModules
      if module.js 
        script(src='#{module.js}', type='text/javascript')
      if module.css 
        link(href='#{module.css}', rel="stylesheet")

    script(src='#{page.name.toLowerCase()}.js', type='text/javascript')

  body
    .container
      each element in page.elements
        div(id=element.name, data-bind="with: #{element.name}PatternInstance")
          !{element.widget.view}
  script
    var bindings = buildPageModel(applyBindings);
    function applyBindings(bindings){
      ko.applyBindings(bindings);
    }
'''
	