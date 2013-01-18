var cons  = require('consolidate'),
    sugar = require('sugar');
;

var argsDefinition = {
	page:     { type: 'object', require: true }
}

module.exports = function(args, callback){

  var page = args.page; 

  cons.jade(__dirname + "/page.jade", {page: page, pretty: true}, afterJade );

  function afterJade(err, html){
    page.html = html;
    callback(err, page);
  }
}