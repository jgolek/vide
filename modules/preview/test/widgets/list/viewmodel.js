function List(model){
  var self = this;
  self.model = model;

  if(!self.model.title){
    self.model.title = "No Title";
  }

  var templateValue = {};

  self.pattern = {
    selected : ko.observable(templateValue)
  }

  self.select = function(item){
    self.pattern.selected(item);
  };
}