
function ButtonWithAddAndDelete(model){
  var self = this;
  self.model = model;

  self.objects = model.objects;

  self.value = ko.observable();

  self.getDefaultData = function(callback){

  }

  self.create = function(){
  	console.log('create');
  	self.objects.add({name: self.value()});
  }
}