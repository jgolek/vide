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

function buildPageBindings(){
	var textoutput = new Textoutput({});
	var list = new List({});
	var bindings = {
	  "element1PatternInstance": textoutput,
	  "element2PatternInstance": list
	}
	return bindings;
}