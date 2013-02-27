
function Fragebogen(model){
  var self = this;
  self.model = model;

  self.kategorien = model.kategorien;

  self.nextPageLink = model.link +"?jugendlicher="+model.jugendlicher;
  if(model.mitarbeiter){
  	self.nextPageLink += "&mitarbeiter="+model.mitarbeiter();
  }

  self.label = {
    abort: "Abbrechen",
    next: model.nextText || "Speichern"
  }
}