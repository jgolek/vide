function Manager(data){
  var self = this;
  self.name = data.get('name');

  self.houses = data.getQuery( "/resource/house?managerid="+data.id );

}