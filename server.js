var  HOSTED_ON_JOYENT = /\/home\/node\/node\-service\/releases\/[^\/]*\/server.js/.test(__filename)
    ,WEBSERVER_PORT = HOSTED_ON_JOYENT ? 80 : 8080

// Module dependencies.
var express = require('express');
var app = module.exports = express.createServer();
nko = require('nko')('UPCjVVJFyXVIb+Wu');

var game = require('./lib/game').Game;
var utils = require('./lib/util').Util;

utils = new Util();

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

// Games configuration
games = {};

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Cube Game'
  });
});

app.get('/newMatch', function(req, res){
  
  var blurb = utils.generateBlurb();
  while (typeof games[blurb] != 'undefined') {
    blurb = utils.generateBlurb();
  }
  
  var game = new Game(blurb); 
  games[blurb] = game;
  
  game.initGame();
  
  res.redirect('/match/' + blurb + '/player1');
  
});

app.get('/match/:blurb/:player', function(req, res){
  
  
  game = games[req.params.blurb];
  player = req.params.player;
  if( typeof game != 'undefined'){
    res.render('match', {
      title: 'Game',
      player: player,
      blurb: game.blurb
    });
  }
  else {
    res.render('error', {
      title: 'Error', 
      msg: 'The game ' + req.params.blurb + ' does not exists.'
    });
  }
});


app.get('/match/:blurb/gamestatus/:playerName', function(req, res){
  
  game = games[req.params.blurb];
  player = req.params.playerName;
  if( typeof game != 'undefined'){
    
    if (player == 'player1') {
      var cube = game.player1.getCube();
      var shots = game.player1.getShots();
    }

    if (player == 'player2') {
      var cube = game.player2.getCube();
      var shots = game.player2.getShots();
      game.getStatusPlayer2('connected');
    }

    var dict = {
      'cube': cube,
      'shots': shots,
      'player2_connected': game.player2Connected(),
      'turn': game.turn
    }

    res.header('Content-Type', 'text/plain');
    res.send(JSON.stringify(dict));
  }
  else {
    res.render('error', {
      title: 'Error', 
      msg: 'The game ' + req.params.blurb + ' does not exists.'
    });
  }
});

app.get('/match/:blurb/:playerName/fire/:xyz', function(req, res){
  // parse xyz to grab the position
  pos_x = req.params.xyz.substr(0,1);
  pos_y = req.params.xyz.substr(1,1);
  pos_z = req.params.xyz.substr(2,1);
  
  game = games[req.params.blurb];
  player = req.params.playerName;
  if( typeof game != 'undefined'){
    game.fire(player, pos_x, pos_y, pos_z);
    res.send('okay');
  }
  else {
    res.render('error', {
      title: 'Error', 
      msg: 'The game ' + req.params.blurb + ' does not exists.'
    });
  }
  
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
