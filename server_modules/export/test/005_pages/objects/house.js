function House(data){
  var self = this;
  self.name = data.get('name' );

  self.toString = function(){
    return self.name();
  }
}