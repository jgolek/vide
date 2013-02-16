var data = {
	'foo' : { 
    'name' : 'fooname',
    'bar': {
      'name' : 'barname'
    },
    'list' : [
      { 'name' : 'bar1'},
      { 'name' : 'bar2'},
      { 'name' : 'bar3'}
    ]
  }
}

function Foo(data){
	var self = this;
  self.name = data.get('name');
  self.bar  = data.get('bar', Bar);
  self.list = data.getList('list', Bar);
  console.log(data.url);
}

function Bar(data){
  var self = this;
  self.name = data.get('name');
  console.log(data.url);
}

var repo = new Repository(data, 'http://localhost:3000/data');

test( "test get and update ", function() {

  var foo = repo.get('foo', Foo)();

  foo.name('hallo welt');

  foo.list()[1].name('bar 1.2.3');

  console.log(foo.name());

  ok(foo.name);
});

test( "test get and create ", function() {

  var foo = repo.get('foo', Foo)();

  foo.list.add(
    {"name": "new value121"}
  );

  ok(foo.name);
});

test( "test get and delete ", function() {

  var foo = repo.get('foo', Foo)();

  var obj = foo.list()[0];
  
  foo.list.del(obj);

  ok(foo.name);
});
