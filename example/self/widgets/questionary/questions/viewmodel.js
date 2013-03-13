/**
  * Questionary
  * @param {Object} model.questionary
  * @param {Object} model.result
  * @param {String} model.editor teen or user
  */
function QuestionaryQuestions(model){
  var self = this;
  self.model = model;

  self.categories = model.questionary().categories();

  self.label = {
    abort: "Abbrechen",
    next: model.nextText || "Speichern"
  }

  self.editable = model.editable == "true";

  self.results = {};

  if(model.result()[model.editor] && model.result()[model.editor]()){
    self.results = model.result()[model.editor]();
  }

  self.createResultForQuestion = function(questionId){
    var resultValue = undefined;
    if(self.results[questionId]){
      resultValue = self.results[questionId];
    }

  	var resultObj = { questionId: questionId, result: ko.observable(resultValue) }
  	self.results[questionId] = resultObj;
  	return resultObj;
  }

  self.abort = function(){
    window.open( "/start", '_self', false )
  }

  self.save = function(){

  	var resultDto = {
      teenId: model.teen().id,
      userId: model.user().id,
  		teen: {},
  		date: new Date().toString()
  	}

  	for(var id in self.results){
      var resultObj = self.results[id];
  		resultDto.teen[resultObj.questionId] = resultObj.result()
    }

  	if( model.result().id == null ){
	  	model.result().create(resultDto, function(data){
	  		console.log('created', data);
	  		window.open(
	  			model.link+'?userId='+model.user().id+'&teenId='+model.teen().id+'&resultId='+data.id, 
	  			'_self', false)
	  	})  		
	  } else {
      model.result().save({user: resultDto.teen}, function(data){
        window.open(
          model.link+'?userId='+model.user().id+'&teenId='+model.teen().id, '_self', false)          
      })
	  }
  }
}

