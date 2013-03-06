//header
function Textoutput(model){
  var self = this;
  self.paint = ko.observable(false);
  self.model = model;
  
  if(!self.model.text){
    self.model.text = ko.observable("not set");
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
    console.log(item);
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

  self.t = function(name){
    self.model.items().forEach(function(item){
      if(item.name && (item.name() == name)) {  
        console.log(item);
        self.select(item);
      }
    });
  }
}

function Textinput(model){
  var self = this;
  self.model = model;
  
  if(!self.model.text){
    self.model.text = ko.observable("not set");
  }
}

function Textoutput(model){
  var self = this;
  self.paint = ko.observable(false);
  self.model = model;
  
  if(!self.model.text){
    self.model.text = ko.observable("not set");
  }
}

function House(data){
  var self = this;
  self.name = data.get('name');

  self.toString = function(){
    return self.name();
  }
}

function HouseManagement(data){
  var self = this;
  self.houses   = data.getList('houses', House);
  self.manager = data.get('manager', Person);
}

function Person(data){
  var self = this;
  self.name = data.get('name');
}

function buildPageModel(url, callback){
  var requiredResources = ['housemanagement'];
  var loadedResources = [];
  var resources = {};

  $.get(url +"/housemanagement", function(data){
    resources.housemanagement = data;
    loadedResources.push('housemanagement');
    done();
  });

  function done(){
    if(requiredResources.length == loadedResources.length){
      var repository = new Repository(resources, url);
      var pageBindings = buildPageBindings(repository);
      repository.enableUpdate();
      callback(pageBindings);
    }
  }
}

function buildPageBindings(repository) {
  var housemanagement = repository.get( 'housemanagement', HouseManagement );

  //pagestate = $.parsequery(location.search).keys;
  var pageinput = $.parseQuery(location.search);

  var textoutputForElement1 = new Textoutput(
    {
      'text': housemanagement().manager().name
    }
  );
  
  var listForElement2 = new List(
    {
      'items': housemanagement().houses,
      'selectByName': pageinput.selected
    }
  );
  
  var textinputForElement3 = new Textinput(
    {
      'text': ko.observable(),
      'text2': ko.observable()
    }
  );
  var updateTextInTextInputForElement3 = function(data){
    textinputForElement3.model.text(data.name);
  };
  listForElement2.pattern.selected.subscribe(updateTextInTextInputForElement3);
  updateTextInTextInputForElement3(listForElement2.pattern.selected());
  
  var textoutputForElement4 = new Textoutput(
    {
      'text': ko.observable()
    }
  );
  listForElement2.pattern.selected.subscribe(function(data){
    console.log("SELECT4", data.name());
    textoutputForElement4.model.text(data.name);
  });

  //listForElement2.select(housemanagement().houses()[0]);
  //listForElement2.t(pageinput.selected);


  var bindings = {
    'element1PatternInstance': textoutputForElement1,
    'element2PatternInstance': listForElement2,
    'element3PatternInstance': textinputForElement3,
    'element4PatternInstance': textoutputForElement4
  };
  return bindings;
}
