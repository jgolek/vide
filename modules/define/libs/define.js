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
      var argValue = args[argName];
      validate(arg, argValue);
    }

    fn(args, callback);
  }
}

function validate(argDefintion, argValue){
  if(argDefintion != typeof(argValue)){
    var error = new Error("invalide");
    throw error;
    //callback(error);
  }
}