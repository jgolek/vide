
startPage = require '../example/pages/start'

exports.testStartPage = (test) ->

	#test.equal 2, startPage.resources.length 

	#test.deepEqual [{name: 'User'}], startPage.getRequiredTypes()

	test.done()