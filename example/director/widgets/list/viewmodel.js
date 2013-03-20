/**
 * Graph
 *
 * @param {Object} items with name 
 */
function List(model){
	var self = this;

	self.items = [];

	model.items().forEach(function(item){
		console.log(item.id == model.selected().id);
		console.log(item)
		console.log(model.selected());
		self.items.push({
			isSelected: item.id == model.selected().id,
			name: item.name,
			link: model.link instanceof Function ? model.link(item): item.name
		})
	});
}