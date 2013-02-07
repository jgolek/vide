var express = require('express');
var datafs = require('./server/datafs');
var app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + "/client"));

datafs.init(__dirname + "/data");
datafs.use(app); //rewrite this

app.listen(3000, function(){
	console.log("started");
});
