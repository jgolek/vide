module.exports = 
class Teen 
	constructor: (data) ->
		@name = data.get 'name'
		@id = data.id
		@results = data.getQuery({url: "/resource/questionaryresult", where:{ "teenId": data.id } }, QuestionaryResult )

		console.log(@results)
