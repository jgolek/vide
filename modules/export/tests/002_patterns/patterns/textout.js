function Textout(model){
	var self = this;
	self.model = model;

	if(!self.model.text){
		self.model.text = "not set";
	}
}