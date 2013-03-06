
function Foo(data){
	var self = this;
  self.name = data.get('name');
  //self.bar  = data.get('bar', Bar);
  //self.list = data.getList('list', Bar);
  console.log(data);

  //self.mybars = data.getQuery('/resource/bar?fooid='+data.id, Bar);
  self.mybars = data.getQuery({url: "/resource/bar", where:{ "fooid": data.id } }, Bar);
}

function Bar(data){
  var self = this;
  self.name = data.get('name');
  console.log(data.url);
}

var urls = [
  {
    url: "/resource/foo/1",
    as: "foo"
  },
  {
    url: "/resource/bar",
    as: "bar"
  }
];

new Resources(urls, function(resources){

    test( "test get and update ", function() {

      var foos = resources.getObjectOrGetList('foo', Foo)();

      //foos.mybars().add()

      //console.log(foo);
      //console.log(foo.name());
      //foo.name('hallo welt');

      //foo.list()[1].name('bar 1.2.3');

      //console.log(foo.name());

      ok(foos);
    });

    setTimeout(function(){
      var foo = resources.getObjectOrGetList('foo', Foo)();
      console.log("BARS", foo.mybars());

      foo.mybars.add({name:"bar33"});

      new Resources(urls, function(res){
        var bars = res.getObjectOrGetList('bar', Bar)();
        console.log("new bars", bars);
      });

    }, 2000);
});

// new Resources(urls, function(resources){


//   test( "test get and update ", function() {

//     var foo = resources.get('foo', Foo)();

//     foo.name('hallo welt');

//     foo.list()[1].name('bar 1.2.3');

//     console.log(foo.name());

//     ok(foo.name);
//   });

//   test( "test get and create ", function() {

//     var foo = resources.get('foo', Foo)();

//     foo.list.add(
//       {"name": "new value121"}
//     );

//     ok(foo.name);
//   });

//   test( "test get and delete ", function() {

//     var foo = resources.get('foo', Foo)();

//     var obj = foo.list()[0];
    
//     foo.list.del(obj);

//     ok(foo.name);
//   });
// });