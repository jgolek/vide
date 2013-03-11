function ButtonDefault(model){
	var self = this;
	self.model = model;

	self.link = ko.computed(function(){
		return model.link();
	});
};