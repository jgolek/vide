function DemoObject(data){
	var self = this;

	self.name = data.get('name');
}

function ButtonObject(data){

	var self = this;

	self.objects = data.getList('objects', DemoObject);


	


}