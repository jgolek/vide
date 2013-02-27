function DemoObject(data){
	var self = this;

	self.name = data.get('name');
}

function ComboboxObject(data){

	var self = this;

	self.objects = data.getList('objects', DemoObject);


}