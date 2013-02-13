require('sugar'); //require for the jade template (to-page-html.jade). It contains 'capitilize'.
var cons  = require('consolidate');

var argsDefintion = {
  page: { type: 'Page' },
  patternSource: {type: 'Source'}
};

module.exports = function(args, callback){

    function includePattern(patternName){
      return args.patternSource.get(patternName + ".html");
    }

    function includeElements(elements){
      var elementsCssLines = [];

      elements.forEach(forElement);
      function forElement(element){
        var elementCssLines = [];
        elementCssLines.add("#"+element.name+" {");
        elementCssLines.add(  "  width:    "+element.width+"px;");
        elementCssLines.add(  "  height:   "+element.height+"px;");
        elementCssLines.add(  "  top:      "+element.y+"px;");
        elementCssLines.add(  "  left:     "+element.x+"px;");
        elementCssLines.add(  "  position: "+(element.position || "absolute") + ";" );
        elementCssLines.add(  "  border:   "+(element.border || 0)+"px solid;");
        elementCssLines.add("}");
        elementsCssLines.add(elementCssLines.join("\n"));
      }
      return elementsCssLines.join("\n");
    }

    cons.jade(
      __dirname + "/to-page-html.jade", 
      { page: args.page, 
        pretty: true, 
        includePattern: prettyPrint(includePattern),
        includeElementsCss: prettyPrint(includeElements) }, 
      callback 
    );
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