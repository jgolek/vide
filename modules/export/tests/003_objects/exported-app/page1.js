function Textoutput(model){
  var self = this;
  self.model = model;
  if(!self.model.text){
    self.model.text = "not set";
  }
}

function List(model){
  var self = this;
  self.model = model;
  if(!self.model.items){
    self.model.items = [1,2,3];
  }
}

function Textoutput(model){
  var self = this;
  self.model = model;
  if(!self.model.text){
    self.model.text = "not set";
  }
}


function buildPageBindings(){
  var textoutput = new Textoutput({});
  var list = new List({});
  var textinput = new Textinput({});
  var textoutput = new Textoutput({});
  var bindings = {
    "element1PatternInstance": textoutput,
    "element2PatternInstance": list,
    "element3PatternInstance": textinput,
    "element4PatternInstance": textoutput
  }
  return bindings;
}