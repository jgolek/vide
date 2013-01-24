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

function HouseManagement(data){
  var self = this;
  self.house   = data.getList('houses', House);
  self.manager = data.get('manager', Manager);
}

function House(data){
  var self = this;
  self.address = data.get('address', 'String');
}

function Person(data){
  var self = this;
  self.name = data.get('name', 'String');
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

  var housemanagement = repository.get('housemanagement', HouseManagement);

  var textoutput = new Textoutput(
    {
      "text": housemanagement.manager().name
    }
  );

  var list = new List(
    {
      "items": housemanagement.houses
    }
  );

  var bindings = {
    "element1PatternInstance": textoutput,
    "element2PatternInstance": list
  }

  return bindings;
}