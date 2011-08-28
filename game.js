var WEBSERVER_PORT = 8080

// Module dependencies.
var express = require('express');
var app = module.exports = express.createServer();

var Cube = require('../lib/cube').Cube;

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

var player1 = new Cube()
    , player2 = new Cube();

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.get('/helloworld', function(req, res){
  res.render('hello', {
    title: 'Hello World'
  });
});

app.listen(WEBSERVER_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);