function House(data){
  var self = this;
  self.address = data.get('address' );
  self.name = self.address;

  self.toString = function(){
    return self.address();
  }
}