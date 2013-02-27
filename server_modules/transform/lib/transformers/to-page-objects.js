require('sugar');
var define = require('../../../define');


var argsDefintion = {
	objectSource: {type: 'object'}
}

module.exports = define(argsDefintion, function(args, callback){
  args.objectSource.all(afterAll);

  function afterAll(err, objects){
    var objectLines = objects.map(function(obj){return buildObjectLines(obj) + "\n"});
    callback(null, objectLines.join("\n"));
  }
});

function buildObjectLines(obj){
	var lines = [];
	if(obj.json){


	  lines.push("function "+obj.name.capitalize() +"Model(data){");
	  lines.push("  var self = this;");
	  for(var propertyName in obj.json) {
	  	var property = obj.json[propertyName];
	  	if(property.type.toLowerCase() == 'string'){
	  		lines.push("  self."+propertyName+" = data.get('"+propertyName+"');");
	  	}
	  }
	  lines.push("}");
	}
	if(obj.js){
		lines.push(obj.js);
	}
	return lines.join('\n');
}