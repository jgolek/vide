//header
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

function House(url, repository){
	var self = this;

	self.persons = repository.getList(url + "/persons", Person);
	self.housemanagement = repository.getReference(url + "/housemanagement", Housemanagement);



}
function Housemanagement(data){

	var self = this;
	self.houses = data.houses; //should be observable
	self.mananger = data.manager; //aggregate



}
function Person(url, repository){
	var self = this;

	self.name = ko.observable();

}

function buildPageBindings(){

  var repository = new Repository(
    {
      "housemanagement": {
        "houses": [
          {
            "address": "abc street 1"
          },
          {
            "address": "abc street 2"
          }
        ],
        "manager": {
          "name": "Hans Ditrich"
        }
      }
    }
  );

  var housemanagement = repository.get( 'housemanagement', HouseManagement);

  var textoutputForElement1 = new Textoutput({
    'text': housemanagement().manager().name
  });
  
  var listForElement2 = new List({
    'items': housemanagement().houses
  });
  
  var textinputForElement3 = new Textinput({
    'text': listForElement2.selected().name
  });
  listForElement2.pattern.selected.subscribe(function(data){
    textinputForElement3.model.text(data.name);
  });
  
  
  var textoutputForElement4 = new Textoutput({
    'text': listForElement2.selected().name
  });
  listForElement2.pattern.selected.subscribe(function(data){
    textoutputForElement4.model.text(data.name);
  });
  

  var bindings = {
    'element1PatternInstance': textoutputForElement1,
    'element2PatternInstance': listForElement2,
    'element3PatternInstance': textinputForElement3,
    'element4PatternInstance': textoutputForElement4
  };
}
