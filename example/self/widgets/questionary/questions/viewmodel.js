
function QuestionaryQuestions(model){
  var self = this;
  self.model = model;

  self.categories = model.questionary().categories();
  console.log(self);


  self.label = {
    abort: "Abbrechen",
    next: model.nextText || "Speichern"
  }

  self.results = []

  self.createResultForQuestion = function(questionId){
  	var resultObj = { questionId: questionId, text: 'test', result: ko.observable() }
  	self.results.push(resultObj);
  	return resultObj;
  }

  self.save = function(){

  	var resultDto = {
  		teen: {},
  		date: new Date().toLocaleString()
  	}

  	self.results.forEach(function(resultObj){
  		resultDto.teen[resultObj.questionId] = resultObj.result()
  	});

  	console.log( model.result().id );

  	if( model.result().id == null ){
	  	model.result().create(resultDto, function(data){
	  		console.log('created', data);
	  		window.open(
	  			model.link+'?userId='+model.user().id+'&teenId='+model.teen().id+'&resultId='+data.id, 
	  			'_self', false)
	  	})  		
	  } else {
	  	console.log(resultDto.teen)
	  	model.result().user(resultDto.teen);
  		window.open(
  			model.link+'?userId='+model.user().id+'&teenId='+model.teen().id, '_self', false)	  	
	  }
  }
}