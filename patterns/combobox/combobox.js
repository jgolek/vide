
function Combobox(model){
  var self = this;
  self.model = model;

  self.objects = model.objects;

  self.inputValue = ko.observable();

  self.pattern = {
  	selected: ko.observable()
  }

  self.select = function(data){
  	console.log('select', data);
  	self.inputValue(data.name());
  	self.pattern.selected(data);
  	self.model.selected(data);
  }

  if(self.objects().length > 0){
  	self.select(self.objects()[0]);
  }

  self.list = function(){

  	var resultList = self.objects().map(function(o){return "\""+o.name()+"\"";});

  	//console.log(resultList.toString());

  	console.log('\"['+resultList.join(",")+']\"');

  	return '['+resultList.join(",")+']';
  	//return '["Test1","asdfa"]';
  }

  self.selectFromInput = function(){
  	//console.log('select', data);
  	//self.inputValue(data.name());
  }

}