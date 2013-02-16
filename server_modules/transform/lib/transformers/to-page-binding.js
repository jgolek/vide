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
  data: { type: 'object' },
  pageObjects: { type: 'array' }
};

module.exports = function(args, callback){

  var pagebindingLines = [];

  pagebindingLines.push(buildPageModelLines(args.pageObjects) + "\n");

  pagebindingLines.push("function buildPageBindings(repository){" + "\n");
  pagebindingLines.push(indent(buildRootObjectVars(args.pageObjects), '  ') + "\n" );
  pagebindingLines.push(indent('var pageinput = $.parseQuery(location.search);', '  ') + "\n" );

  pagebindingLines.push(indent(buildBindingLines(args), '  ') + "\n" );
  pagebindingLines.push(indent(buildPageBindingLines(args), '  '));

  pagebindingLines.push("}");

  console.log(pagebindingLines.join("\n"));

  callback(null, pagebindingLines.join("\n"));
}

function buildPageModelLines(pageObjects){

  var resourceNames = pageObjects.map(function(pageObject){return "'"+pageObject.name+"'";});

  var lines = [];

  lines.push("function buildPageModel(url, callback){");
  lines.push("  var requiredResources = ["+resourceNames.join(",")+"];");
  lines.push("  var loadedResources = [];");
  lines.push("  var resources = {};");
  
  pageObjects.forEach(function(pageObject){
    lines.push("");
    lines.push("  $.get(url +\"/"+pageObject.name+"\", function(data){");
    lines.push("    resources."+pageObject.name+" = data;");
    lines.push("    loadedResources.push('"+pageObject.name+"');");
    lines.push("    done();");
    lines.push("  });");
  });

  lines.push("");
  lines.push("  function done(){");
  lines.push("    if(requiredResources.length == loadedResources.length){");
  lines.push("      var repository = new Repository(resources, url);");
  lines.push("      var pageBindings = buildPageBindings(repository);");
  lines.push("      repository.enableUpdate();");
  lines.push("      callback(pageBindings);");
  lines.push("    }");
  lines.push("  }");
  lines.push("  done();");


  lines.push("}");

  return lines.join('\n');
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
  content += "};\n";
  content += "return bindings;";
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

    lines.push("var " + binding.patternVar + " = new " + binding.patternName + "(" );
    lines.push("  {" );


    var selectables = [];

    var rootObjects = [];

    var patternBindings = [];
    for(var patternInputProperty in binding.patterndata){
      console.log(binding);
      var patterndata = binding.patterndata[patternInputProperty];

      switch( patterndata.type ) {
        case 'static':
          patternBindings.push("    '" + patternInputProperty + "': '"+patterndata.value+"'" );
          break;
        case 'domain':
          var value = patterndata.value.split(".").join("().");
          patternBindings.push("    '" + patternInputProperty + "': "+value );
          break;
        case 'element':
          var valueChain = patterndata.value.split(".");
          var referenceElementName = valueChain[0];
          var referenceBinding = bindings[referenceElementName];
          console.log(referenceBinding);
          if(!referenceBinding){
            throw new Error("Reference is missing: " + referenceElementName);
          }
          valueChain.shift();
          //patternBindings.push("    '" + patternInputProperty + "': "+referenceBinding.patternVar + ".pattern." + valueChain.join('().'));
          patternBindings.push("    '" + patternInputProperty + "': ko.observable()");

          //TODO: rewrite this!
          var dataValue = valueChain.length > 1 ? "data."+valueChain.pop() : "data";
          selectables.push({
            fnUpdateName: "update"+patternInputProperty+binding.patternVar,
            subscribePath: referenceBinding.patternVar+".pattern."+valueChain[0],
            referencePath: binding.patternVar + ".model."+patternInputProperty+"("+dataValue+");"
          });
          break;
        case 'pageinput':
          patternBindings.push("    '" + patternInputProperty + "': pageinput."+patterndata.value );
          break;
        default:
          throw new Error("unknown type " + patterndata.type);
      }
    }

    lines.push(patternBindings.join(",\n"));
    lines.push("  }");
    lines.push(");");

    selectables.forEach(function(selectable){
      lines.push('var '+selectable.fnUpdateName+' = function(data){');
      lines.push("  "+selectable.referencePath);
      lines.push("};")

      lines.push(selectable.subscribePath +".subscribe("+selectable.fnUpdateName+");");
      lines.push(selectable.fnUpdateName+'('+selectable.subscribePath+'());');

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

function buildRootObjectVars(rootObjects){
  var lines = [];
  rootObjects.forEach(function(rootObject){
    lines.push("var "+rootObject.name+" = repository.get( '"+rootObject.name+"', "+rootObject.type + " );");
  });
  return lines.join("\n");
}

function indent(value, spaces){
  var lines = value.split("\n");
  var indentedLines = lines.map(function(line){return spaces + line});
  return indentedLines.join("\n");
}
