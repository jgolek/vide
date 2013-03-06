
function ButtonCreate(model){
  var self = this;
  self.model = model;

  self.element = undefined;
  self.modalElement = undefined;


  self.objects = model.objects;

  self.value = ko.observable();

  self.setButtonElement = function(element){
  	self.element = element;
  }

  self.setModalElement = function(element){
  	self.modalElement = element;
  }

  self.create = function(){
  	console.log('create');
  	$(self.element).button('loading');
  	self.objects.add({name: self.value()}, created);
  }

  function created(){
  	console.log("created!");
  	//$('createModal').modal('hide');
  	$(self.element).button('complete!');
  	$(self.modalElement).modal('hide');
  }
}