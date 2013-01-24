function House(url, data, repository){
	var self = this;

	self.persons = repository.getList(url + "/persons", Person);
	self.housemanagement = repository.getReference(url + "/housemanagement", Housemanagement);


}