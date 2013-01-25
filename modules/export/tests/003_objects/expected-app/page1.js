function Textoutput(model){
  // pattern interface, model mapping!
  // model is always observable or observablearray
  // required interface

  var self = this;
  self.paint = ko.observable(false);
  self.model = model;
  console.log(self.model);
  
  if(!self.model.text){
    console.log(self.model.text());
    //self.model.text = "not set";
  }

  self.repaint = function(){
    self.paint(true);
    //self.model.text("asd");
    //rebind of knockout js?!
  }
}

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
}

function HouseManagement(data){
  var self = this;
  self.houses   = data.getList('houses', House);
  self.manager = data.get('manager', Person);
}

function House(data){
  var self = this;
  self.address = data.get('address' );
  self.name = self.address;

  self.toString = function(){
    return self.address();
  }
}

function Person(data){
  var self = this;
  self.name = data.get('name');
}

function buildPageBindings(){

  var repository = new Repository(
    {
      "housemanagement": {
        "houses": [ {
          "address" : "abc street 1"
        },
        {
          "address" : "abc street 2"
        }],
        "manager": {
          "name" : "Hans Ditrich" 
        }
      }
    }
  );

  var housemanagement = repository.get( 'housemanagement', HouseManagement );

  var textoutputForElement1 = new Textoutput(
    {
      "text": housemanagement().manager().name
    }
  );

  var listForElement2 = new List(
    {
      "items": housemanagement().houses
    }
  );

  var textoutputForElement3 = new Textoutput(
    {
      "text": ko.observable()
    }
  );

  listForElement2.pattern.selected.subscribe(function(data){
    textoutputForElement3.model.text(data.name);
  });

  var textoutputForElement4 = new Textoutput(
    {
      "text": ko.observable()
    }
  );

  listForElement2.pattern.selected.subscribe(function(data){
    textoutputForElement4.model.text(data.name);
  });

  var bindings = {
    "element1PatternInstance": textoutputForElement1,
    "element2PatternInstance": listForElement2,
    "element3PatternInstance": textoutputForElement3,
    "element4PatternInstance": textoutputForElement4

  }

  return bindings;
}