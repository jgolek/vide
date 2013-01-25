var cons  = require('consolidate'),
    async = require('async'),
    sugar = require('sugar');

// preload global variables
init();

function init(){

}

var argsDefinition = {
	page:          { type: 'object', require: true },
  patternSource: { type: 'Source' }
};

var patternDirectory = undefined;
module.exports = function(args, callback){

  var page = args.page; 
  patternDirectory = args.patternDirectory;

  async.parallel(
    {
      "html": buildPageHtml,
      "js":   buildPageJs
    }, 
    returnResult 
  );

  function buildPageHtml(callback){

    function includePattern(patternName){
      return args.patternSource.get(patternName + ".html");
    }

    function includeElements(elements){
      var elementsCssLines = [];

      elements.forEach(forElement);
      function forElement(element){
        var elementCssLines = [];
        elementCssLines.add("#"+element.name+" {");
        elementCssLines.add(  "  width:  "+element.width+"px;");
        elementCssLines.add(  "  height: "+element.height+"px;");
        elementCssLines.add(  "  top:    "+element.y+"px;");
        elementCssLines.add(  "  left:   "+element.x+"px;");
        elementCssLines.add(  "  position: absolute;");
        elementCssLines.add(  "  border: 1px solid;");
        elementCssLines.add("}");
        elementsCssLines.add(elementCssLines.join("\n"));
      }
      return elementsCssLines.join("\n");
    }

    cons.jade(
      __dirname + "/page.jade", 
      { page: page, 
        pretty: true, 
        includePattern: prettyPrint(includePattern),
        includeElementsCss: prettyPrint(includeElements) }, 
      callback 
    );
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

function prettyPrint(get){
  return function(name, prefix){
    if(!prefix){
      prefix = "";
    }
    var content = get(name);
    if(!content) return "";

    var prettyContent = "\n";
    content.split("\n").forEach(function(line, index, array){
      prettyContent += prefix + line;
      if(index < (array.length - 1) ){
        prettyContent += "\n";       
      }
    });
    return prettyContent;
  }
};