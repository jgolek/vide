function buildPageBindings(){

  var repository = new Repository(
    {
      'testdata': {
        'name': 'demo'
      }
    }
  );

  var testobject = repository.get( 'testdata', TestObject );

  var pattern1ForElement1 = new Pattern1(
    {
      "text": testobject().name
    }
  );

  var pattern2ForElement2 = new Pattern2(
    {
      "text": ko.observable();
    }
  );

  pattern1ForElement1.pattern.selected.subscribe(function(data){
    pattern2ForElement2.model.text(data);
  });

  var bindings = {
    "element1PatternInstance": pattern1ForElement1,
    "element2PatternInstance": pattern2ForElement2
  }

  return bindings;
}