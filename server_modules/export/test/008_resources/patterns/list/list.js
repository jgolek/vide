function List(model){
  var self = this;
  self.model = model;

  if(!self.model.title){
    self.model.title = "No Title";
  }

  if(!self.model.items){
    self.model.items = [1,2,3];
  }

  var templateValue = {};

  self.pattern = {
    selected : ko.observable(templateValue)
  }

  self.select = function(item){
    self.pattern.selected(item);
  };

  if(model.selectByName){
    self.model.items().forEach(function(item){
      if(item.name && (item.name() == model.selectByName)) {
        console.log(item);
        self.select(item);
      }
    });
  }
}