var testmodule = require('./testmodule');
var buster = require('buster');

buster.testCase("define", {

"exports.testDefine" : function(done){

	var args = {
		foo : 'test'
	}

	testmodule(args, testResult);

	function testResult(err, result){
		console.log(result);
		assert.equals(args, result);
		done();
	}
},

"exports.testDefineError" : function(done){

	var args = {
		foo : 123
	}

	testmodule(args, testResult);

	function testResult(err, result){
		console.log(err);
		console.log(result);
		assert.equals(args, result);
		done();
	}
}
});