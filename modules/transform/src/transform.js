var cons  = require('consolidate'),
    async = require('async'),
    sugar = require('sugar');

var transfomers = {
  toHtml : require('transfomers/to-page-html'),
  toJs : require('transfomers/to-page-js')
}

var argsDefinition = {
	page:          { type: 'object', require: true },
  patternSource: { type: 'Source' }
};

var patternDirectory = undefined;
module.exports = function(args, callback){

  var page = args.page; 
  var patternDirectory = args.patternDirectory;

  async.parallel(
    {
      "html": buildPageHtml,
      "js":   buildPageJs
    }, 
    returnResult 
  );

  function buildPageHtml(callback){
    
    var args = {
      page: page,
      patternSource: args.patternSource
    }

    transfomers.toHtml(args, callback);
  }

  function buildPageJs(callback){
    
    var args = {
      page: page,
      patternSource: args.patternSource
    }

    transfomers.toJs(args, callback);
  }

  function buildPageJs(callback){
    var pageJsLines = [];
    
    //var pageHeaderLine = "//TODO"; //TODO add licence";
    //pageJsLines.add(pageHeaderLine);

    var bindings = [];
    args.page.elements.forEach(forElement);

    function forElement(element){
      var patternName = element.pattern;
      var patternJs = args.patternSource.get(patternName + ".js");
      if(patternJs){
        pageJsLines.add(patternJs + "\n");
        //add \n if last one isn't one
      }
      var binding = {
        patternName: patternName,
        patternVar: patternName.toLowerCase(), 
        elementName: element.name + "PatternInstance",
      }
      bindings.add(binding);
    }

    var pageBindingLines = [];
    pageBindingLines.add("function buildPageBindings(){");
    var varLines = [];
    var bindingLines = [];
    bindings.forEach(function(binding){
      varLines.add("  var " + binding.patternVar + " = new " + binding.patternName + "({});");
      bindingLines.add('    "'+binding.elementName+'": '+binding.patternVar);
    });

    pageBindingLines.add(varLines.join("\n"));
    pageBindingLines.add("  var bindings = {");
    pageBindingLines.add(bindingLines.join(",\n"));
    pageBindingLines.add("  }");
    pageBindingLines.add("  return bindings;");
    pageBindingLines.add("}");

    pageJsLines.add("");
    pageJsLines.add(pageBindingLines.join("\n"));

    var pageJs = pageJsLines.join("\n");

    callback(null, pageJs);
  }

  function returnResult(err, results){
    page.html = results.html;
    page.js   = results.js;
    callback(err, page);
  }
}