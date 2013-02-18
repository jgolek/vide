function ButtonBig(model){
	var self = this;
	self.model = model;

	//linkParameters

	self.link = ko.computed(function(){
		var parameter = "";
		if(model.linkParameters){
			parameter = "?" + ko.utils.unwrapObservable(model.linkParameters);
		};
		return model.link + parameter;
	});
};