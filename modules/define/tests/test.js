var testmodule = require('./testmodule');

exports.testDefine = function(test){

	var args = {
		foo : 'test'
	}

	testmodule(args, testResult);

	function testResult(err, result){
		console.log(result);
		test.equal(args, result);
		test.done();
	}
};

exports.testDefineError = function(test){

	var args = {
		foo : 123
	}

	testmodule(args, testResult);

	function testResult(err, result){
		console.log(err);
		console.log(result);
		test.equal(args, result);
		test.done();
	}
};