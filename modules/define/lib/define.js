var async = require('async');

module.exports = function(argsDefintion, fn){
	if(!argsDefintion) throw new Error('argsDefintion not set');
	if(!fn) throw new Error('function not set');

	return validateFunctionWithArgs(argsDefintion, fn);
}

function validateFunctionWithArgs(argsDefintion, fn){
  return doValidation;

  function doValidation(args, callback){

    for(var argName in argsDefintion){
      var arg = argsDefintion[argName];
      if(arg.type){
        arg = arg.type;
      }
      var argValue = args[argName];
      validate(argName, arg, argValue);
    }

    fn(args, callback);
  }
}

function validate(argName, argDefintion, argValue){
  if(argDefintion != typeof(argValue)){
    var error = new Error("For '"+argName+"' expected: '"+argDefintion + "'' but get: '" + argValue + "'");
    throw error;
    //callback(error);
  }
}
