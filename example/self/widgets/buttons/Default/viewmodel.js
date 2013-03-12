
/**
 * Button Default
 *
 * @param {String}    model.name
 * @param {String}    model.icon 
 * @param {Function}  model.link
 */
function ViewModel(model){
	var self = this;
	self.model = model;

	//self.link = ko.computed(function(){
	//	return model.link();
	//});
};