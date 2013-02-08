var cons  = require('consolidate'),
    async = require('async'),
    sugar = require('sugar');

var transfomers = {
  toHtml : require('./transformers/to-page-html'),
  toJs : require('./transformers/to-page-js')
}

var argsDefinition = {
	page:          { type: 'object', require: true },
  patternSource: { type: 'object' },
  objectSource:  { type: 'object' }
};

module.exports = function(args, callback){

  async.parallel(
    {
      "html": buildPageHtml,
      "js":   buildPageJs
    }, 
    returnResult 
  );

  function buildPageHtml(callback){
    
    transfomers.toHtml(args, callback);
  }

  function buildPageJs(callback){
    
    transfomers.toJs(args, callback);
  }

  function returnResult(err, results){
    var page = args.page;
    page.html = results.html;
    page.js   = results.js;
    callback(err, page);
  }
}