
var argsDefintion = {
	elements: {},
	patternSource: {}
}

module.exports = function(args, callback){
  var patternLines = [];

  args.elements.forEach(forElement);  
  function forElement(element){
    var patternName = element.pattern;
    var patternJs = args.patternSource.get(patternName + ".js");
    
    if(patternJs){
      patternLines.push(patternJs + "\n");
    }
  }

  callback(null, patternLines.join("\n"));
}