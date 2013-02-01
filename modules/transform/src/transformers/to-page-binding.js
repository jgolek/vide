require('sugar'); 

var bindingType = {
  patternName: 'String',
  patternVar: 'String',
  elementName: 'String',
  objectBinding: 'object'
}

var patterndataType = {
  'key': {type: 'string', value: 'string'}
}
/* types: 
  static: 'valueabc',
  object: housemanagement/manager/name,
  element: elemen1/selected/name,
  site: page1/subpage1
  pageurl: parament1 
*/

var elementType = {
  pattern: { type: 'string'},
  patterndata: {type: 'object'},
  name: { type: 'name'}
}

var argsDefinition = {
	elements: {},
  data: { type: 'object' }
};

module.exports = function(args, callback){

  var pagebindingLines = [];
  pagebindingLines.push("function buildPageBindings(){" + "\n");

  pagebindingLines.push(indent(buildRepositoryLines(args.data), '  ') + "\n" );
  pagebindingLines.push(indent(buildBindingLines(args), '  ') + "\n" );
  pagebindingLines.push(indent(buildPageBindingLines(args), '  '));
  pagebindingLines.push("}");

  callback(null, pagebindingLines.join("\n"));
}

function buildBindingLines(args){

  var bindingLines = [];
  bindingLines.push(buildPatternBindings(args.elements));

  return bindingLines.join("\n");  
}


function buildPageBindingLines(args) {
  var content = "var bindings = {\n";

  var lines = [];
  var bindings = args.elements.map(elementToBinding);
  bindings.forEach(function(binding){
    lines.push("  '" + binding.elementName + "': " + binding.patternVar);
  });
  content += lines.join(",\n") + "\n";
  content += "};";
  return content;
}

function buildPatternBindings(elements){

  var bindingsArray = elements.map(elementToBinding);

  var bindings = {};
  bindingsArray.forEach(function(binding){
    bindings[binding.name] = binding;
  });

  var lines = bindingsArray.map(buildPatternBindingString);
  return lines.join("\n\n");

  function buildPatternBindingString(binding){
    var lines = [];

    lines.push("var " + binding.patternVar + " = new " + binding.patternName + "({" );

    var selectables = [];

    var patternBindings = [];
    for(var patternInputProperty in binding.patterndata){
      var patterndata = binding.patterndata[patternInputProperty];
      if(patterndata.type == 'static'){
        patternBindings.push("  '" + patternInputProperty + "': '"+patterndata.value+"'" );
      } else if( patterndata.type == 'domain' ) {
        var value = patterndata.value.split(".").join("().");
        patternBindings.push("  '" + patternInputProperty + "': "+value );
      } else if( patterndata.type == 'element' ) {
        var valueChain = patterndata.value.split(".");
        var referenceElementName = valueChain[0];
        var referenceBinding = bindings[referenceElementName];
        valueChain.shift();
        patternBindings.push("  '" + patternInputProperty + "': "+referenceBinding.patternVar + "." + valueChain.join('().'));

        //TODO: rewrite this!
        var dataValue = valueChain.length > 1 ? "data."+valueChain.pop() : "data";
        selectables.push({
          subscribePath: referenceBinding.patternVar+".pattern."+valueChain[0],
          referencePath: binding.patternVar + ".model."+patternInputProperty+"("+dataValue+");"
        });
      } else {
        throw new Error("unknown type " + patterndata.type);
      }
    }
    lines.push(patternBindings.join(",\n"));
    lines.push("});");

    selectables.forEach(function(selectable){
      lines.push(selectable.subscribePath +".subscribe(function(data){");
      lines.push("  "+selectable.referencePath);
      lines.push("});");
      lines.push("");
    });

    return lines.join("\n");
  }
}

function elementToBinding(element){
  var patternName = element.pattern;
    
  var binding = {
    patternName: patternName,
    patternVar: patternName.toLowerCase() + "For" + element.name.capitalize(), 
    elementName: element.name + "PatternInstance",
    patterndata : element.patterndata,
    name: element.name
  };

  return binding;
}

function buildRepositoryLines(data){
  var lines = [];
  lines.push("var repository = new Repository(");
  lines.push(indent(JSON.stringify(data, null , "  "), "  "));
  lines.push(");");
  return lines.join("\n");
}

function indent(value, spaces){
  var lines = value.split("\n");
  var indentedLines = lines.map(function(line){return spaces + line});
  return indentedLines.join("\n");
}
