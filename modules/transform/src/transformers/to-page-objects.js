
var argsDefintion = {
	objectSource: {}
}

module.exports = function(args, callback){
  args.objectSource.all(afterAll);

  function afterAll(err, objects){
    var objectLines = objects.map(function(obj){return obj.js + "\n"});
    callback(null, objectLines.join("\n"));
  }
}