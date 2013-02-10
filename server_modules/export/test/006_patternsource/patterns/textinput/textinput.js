function Textinput(model){
  var self = this;
  self.model = model;
  
  if(!self.model.text){
    self.model.text = ko.observable("not set");
  }
}