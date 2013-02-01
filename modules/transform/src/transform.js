var cons  = require('consolidate'),
    async = require('async'),
    sugar = require('sugar');

var transfomers = {
  toHtml : require('./transformers/to-page-html'),
  toJs : require('./transformers/to-page-js')
}

var argsDefinition = {
	page:          { type: 'object', require: true },
  patternSource: { type: 'Source' }
};

var patternDirectory = undefined;
module.exports = function(args, callback){

  var page = args.page; 
  var patternDirectory = args.patternDirectory;

  async.parallel(
    {
      "html": buildPageHtml,
      "js":   buildPageJs
    }, 
    returnResult 
  );

  function buildPageHtml(callback){
    
    var toHtmlArgs = {
      page: page,
      patternSource: args.patternSource
    }

    transfomers.toHtml(toHtmlArgs, callback);
  }

  function buildPageJs(callback){
    
    transfomers.toJs(args, callback);
  }

  function returnResult(err, results){
    page.html = results.html;
    page.js   = results.js;
    callback(err, page);
  }
}