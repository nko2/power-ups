/**
 * Module dependencies.
 */
var WEBSERVER_PORT = 8080


var express = require('express');

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

// Game functions
setupGame = function(){
  console.log("setuping game");
} 

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Cube Game'
  });
});

app.get('/player1', function(req, res){
  res.render('player1', {
    title: 'Player 1'
  });
});

app.get('/player2', function(req, res){
  res.render('player2', {
    title: 'Player 2'
  });
});

app.get('/atualiza', function(req, res){
  
});

app.get('/iniciajogo', function(req, res){
  res.redirect('/player1');
});

app.get('/entrajogo', function(req, res){
  res.redirect('/player2');
});

app.get('/startmatch', function(req, res){
    setupGame();
    res.redirect('/player1');
});

app.get('/helloworld', function(req, res){
  res.render('hello', {
    title: 'Hello World'
  });
});

app.listen(WEBSERVER_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
