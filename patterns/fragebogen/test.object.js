

function FragebogenKategorie(data){
	var self = this;

	self.title = data.get('title');

	console.log(self.title());

	self.getTitle = function(){
		return 'läuft!';
	}

	self.unterkategorien = data.getList('unterkategorien', FragebogenUnterKategorie);
}

function FragebogenUnterKategorie(data){
	var self = this;

	self.title = data.get('title');

	self.fragen = data.getList('fragen', FragebogenFrage);
}

function FragebogenFrage(data){
	var self = this;

	self.frage = data.get('frage');

	self.ergebnis = ko.observable('c');
}

function FragebogenModel(data){

	var self = this;

	self.kategorien = data.getList('kategorien', FragebogenKategorie);

	self.mitarbeiter = data.get('mitarbeiter');

	self.jugendlicher = data.get('jugendlicher');

}