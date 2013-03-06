function Button(model){
	var self = this;
	self.model = model;

	console.log(self.model.name);

	//linkParameters

	self.link = ko.computed(function(){
		var parameter = "";
		if(model.linkParameters){
			parameter = "?" + ko.utils.unwrapObservable(model.linkParameters);
		};
		return model.link + parameter;
	});
};