var WEBSERVER_PORT = 8080

// Module dependencies.
var express = require('express');
var app = module.exports = express.createServer();

var Cube = require('./lib/player').Player;

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
var player1 = new Player(), 
    player2 = new Player();
    
setupGame = function(){
  console.log("setuping game");
  player1 = new Player(); 
  player2 = new Player();
} 

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Cube Game'
  });
});

app.get('/table/:playerName', function(req, res){
  
  
  
  
  res.render('player1', {
    title: 'Player 1'
  });
});

app.get('/cube/:playerName', function(req, res){
  
  if (req.params.playerName == 'player1') {
    var cubo = player1.getCube();
  }
  
  if (req.params.playerName == 'player2') {
    var cubo = player2.getCube();
  }
  
  res.header('Content-Type', 'text/plain');
  res.send(JSON.stringify(cubo));

});

app.get('/fire/:playerName/:xyz', function(req, res){
  // parse xyz to grab the position
  pos_x = req.params.xyz.substr(0,1);
  pos_y = req.params.xyz.substr(1,1);
  pos_z = req.params.xyz.substr(2,1);
  
  if (req.params.playerName == 'player1') {
    // retreive player cube
    var cubo = player1.getCube();
    // console.log(JSON.stringify(cubo));
    
    // check the shot
    if (cubo[pos_x][pos_y][pos_z] == "1") {
      player1.upScore();
      res.send('YEAH');
    }
    else {
      res.send('NOPE');
    }
    
  }
  if (req.params.playerName == 'player2') {
    // retreive player cube
    var cubo = player2.getCube();
    // console.log(JSON.stringify(cubo));
    
    // check the shot
    if (cubo[pos_x][pos_y][pos_z] == "1") {
      player1.upScore();
      res.send('YEAH');
    }
    else {
      res.send('NOPE');
    }
  }
  
  // just for http 200 check
  res.send('NOTHING');
  
});

app.get('/restartMatch', function(req, res){
  setupGame();
  
  var dict = {
    'player1': player1.score,
    'player2': player2.score
  }
  res.header('Content-Type', 'text/plain');
  res.send(JSON.stringify(dict));
});

app.get('/score', function(req, res){
  var dict = {
    'player1': player1.score,
    'player2': player2.score
  }
  res.header('Content-Type', 'text/plain');
  res.send(JSON.stringify(dict));
});

app.listen(WEBSERVER_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
