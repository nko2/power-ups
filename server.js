
/**
 * Module dependencies.
 */
var  HOSTED_ON_JOYENT = /\/home\/node\/node\-service\/releases\/[^\/]*\/server.js/.test(__filename)
    ,WEBSERVER_PORT = HOSTED_ON_JOYENT ? 80 : 8080


var express = require('express')
    ,nko = require('nko')('UPCjVVJFyXVIb+Wu');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.get('/match/new', function(req, res){
  res.render('bla', {
    title: 'New Match'
  });
});

app.listen(WEBSERVER_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
