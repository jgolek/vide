function Item(data){
	var self = this;
	self.name = data.get('name');

	self.toString = function(){
		return self.name();
	}
}

function ListObject(data){

	var self = this;

	self.items = data.getList('items', Item);

}