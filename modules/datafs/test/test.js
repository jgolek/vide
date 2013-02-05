var datafs = require('..');
var async = require('async');
var fs = require('fs');

var foo = {
  items: []
};

fs.writeFileSync(__dirname + '/data/foo.json', JSON.stringify(foo, null, '  '), 'utf8' );

datafs.init(__dirname + '/data');

exports.testCrud = function(test){
	async.series(
		{
      'created'     : create, 
      'data'        : get, 
      'updated'     : update,
      'updatedData' : get,
      'deleted'     : remove
      //'deletedData' : get
		},
		testResults
	);

  function testResults(err, results){
    if(err) throw new Error(err);
    test.done();
  }

  function create(callback){
    datafs.create('/data/foo/items', callback);
  }

  function get(callback){
    datafs.get('/data/foo/items/0', callback);
  }

  function update(callback){
    var bar = {
      'name': 'bar'
    };
    datafs.update('/data/foo/items/0', bar, callback);
  }

  function remove(callback){
    datafs.del('/data/foo/items/0', callback);
  }

	// get /data/abc/asda
	// post //create
	// put //update
	// delete //remove
}