function Person(url, repository){
	var self = this;

	self.name = ko.observable();




}

self.patternmodel = (url && repository) ? repository.getList(url + "/patternmodel", VidePropertyValue) : ko.observableArray();
  self.patternproperties = ko.observableArray();
  self.patternUrl = ko.observable();
  self.propertypaths = ko.observableArray();
  self.pattern = (url && repository) ? ko.observableReference(repository.get(null, VidePattern)) : ko.observableReference();