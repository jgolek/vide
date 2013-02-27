function Fragebogen(data){
	var self = this;
	self.mitarbeiter = data.get('mitarbeiter');
	self.jugendlicher = data.get('jugendlicher');
}


function FragebogenModel(data){

	var self = this;

	self.fragebogen = data.get('fragebogen', Fragebogen);

}