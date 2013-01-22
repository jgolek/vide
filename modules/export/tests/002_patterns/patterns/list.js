function List(model){
	var self = this;
	self.model = model;
	if(!self.model.items){
		self.model.items = [1,2,3];
	}
}