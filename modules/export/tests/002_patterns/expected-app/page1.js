function Textout(model){
	var self = this;
	self.model = model;
	if(!self.model.text){
		self.model.text = "not set";
	}
}

//
function buildPageBindings(){

	var textoutput = new Textoutput({});
	var bindings = {
	  "element1PatternInstance": textoutput
	}

	return bindings;
}


