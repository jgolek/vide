var define = require('../../../define');

var argsDefintion = {
	objectSource: {type: 'object'}
}

module.exports = define(argsDefintion, function(args, callback){
  args.objectSource.all(afterAll);

  function afterAll(err, objects){
    var objectLines = objects.map(function(obj){return obj.js + "\n"});
    callback(null, objectLines.join("\n"));
  }
});