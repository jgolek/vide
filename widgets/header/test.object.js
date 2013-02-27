function DemoObject(data){
	var self = this;
	self.title = data.get('title');
}

function HeaderObject(data){
	var self = this;
	self.demo = data.get('demo', DemoObject);
}