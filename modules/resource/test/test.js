var express = require('express');

var resources = require('./server/resource');

var app = express();

app.use(express.bodyParser());

resources( 
	{ 
		app: app,
		directory: __dirname + '/resources'
	}
);

app.listen(3000, function(){
	console.log("started");
});
