function Textoutput(model){
  var self = this;
  self.paint = ko.observable(false);
  self.model = model;
  
  if(!self.model.text){
    self.model.text = ko.observable("not set");
  }
}