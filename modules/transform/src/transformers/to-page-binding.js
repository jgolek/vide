var argsDefinition = {
	elements: {}
};

module.exports = function(args, callback){

  var bindings = [];
  args.elements.forEach(forElement);
  function forElement(element){
    var patternName = element.pattern;
    var binding = {
      patternName: patternName,
      patternVar: patternName.toLowerCase(), 
      elementName: element.name + "PatternInstance",
    }
    bindings.add(binding);
  }

  var bindingLines = [];
  bindingLines.add("function buildPageBindings(){");
  var varLines = [];
  var bindingLines = [];

  bindings.forEach(function(binding){
    varLines.add("  var " + binding.patternVar + " = new " + binding.patternName + "({});");
    bindingLines.add('    "'+binding.elementName+'": '+binding.patternVar);
  });

  bindingLines.add(varLines.join("\n"));
  bindingLines.add("  var bindings = {");
  bindingLines.add(bindingLines.join(",\n"));
  bindingLines.add("  }");
  bindingLines.add("  return bindings;");
  bindingLines.add("}");

  callback(null, bindingLines.join("\n"));

}