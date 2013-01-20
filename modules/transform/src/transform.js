var cons  = require('consolidate'),
    sugar = require('sugar');

var argsDefinition = {
	page:          { type: 'object', require: true },
  patternSource: { type: "object" }
};

var patternDirectory = undefined;
module.exports = function(args, callback){

  var page = args.page; 
  patternDirectory = args.patternDirectory;

  cons.jade(
    __dirname + "/page.jade", 
    { page: page, pretty: true, includePattern: prettyPrint(args.patternSource.get) }, 
    afterJade 
  );

  function afterJade(err, html){
    page.html = html;
    callback(err, page);
  }
}

function prettyPrint(get){
  return function(name, prefix){
    if(!prefix){
      prefix = "";
    }
    var content = get(name);
    if(!content) return "";

    var prettyContent = "\n";
    content.split("\n").forEach(function(line, index, array){
      prettyContent += prefix + line;
      if(index < (array.length - 1) ){
        prettyContent += "\n";       
      }
    });
    return prettyContent;
  }
};