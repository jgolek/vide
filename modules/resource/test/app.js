var express = require('express');
var resources = require('../../../server_modules/resource');
var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/../lib/"));
app.use(express.static(__dirname + "/../../"));

resources(
	{ 
		app: app,
		directory: __dirname
	}
);

//datafs.init(__dirname + "/data/");
//datafs.use(app); //rewrite this

app.listen(3000, function(){
	console.log("started");
});
