module.exports = 
class Helper
	constructor: (data) ->
		
		@selected = ko.observable({})


		@toChartSeries = (results) ->
			teen_serie =
				name: 'Gesamt (Jugendlicher)'
				data: []

			user_serie =
				name: 'Gesamt (Mitarbeiter)' 
				data: []
				dashStyle: 'Dash'

			for result, index in results
				date = new Date()
				console.log(date.toLocaleString());
				teen_serie.data.push [index + 1, calculatePoint(result.teen())]
				user_serie.data.push [index + 1, calculatePoint(result.user())]


			[teen_serie, user_serie]

		calculatePoint = (obj) ->
			points = 0
			for id, result of obj
				switch result
				 	when 'a' then points += 5
				 	when 'b' then points += 4
				 	when 'c' then points += 3
				 	when 'd' then points += 2
			points
