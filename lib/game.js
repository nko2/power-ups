var player = require('./player').Player;

Game = function(blurb) {
  this.blurb = blurb;
  
}

Game.prototype.initGame = function() {
  this.player1 = new Player();
  this.player2 = new Player();
}

Game.prototype.fire = function(playerName, pos_x, pos_y, pos_z) {
  if (playerName == 'player1') {    
    if ((player2.cube[pos_x][pos_y][pos_z] == "1") && (player1.shots[pos_x][pos_y][pos_z] == '0')) {
      player1.setShot(pos_x, pos_y, pos_z, 'hit');
      player1.upScore();
    }
    if ((player2.cube[pos_x][pos_y][pos_z] == "0") && (player1.shots[pos_x][pos_y][pos_z] == '0')) {
      player1.shots[pos_x][pos_y][pos_z] == '2';
    } 
    
  }
  if (playerName == 'player2') {    
    if ((player1.cube[pos_x][pos_y][pos_z] == "1") && (player2.shots[pos_x][pos_y][pos_z] == '0')) {
      player2.setShot(pos_x, pos_y, pos_z, 'hit');
      player2.upScore();
    }
    if ((player1.cube[pos_x][pos_y][pos_z] == "0") && (player2.shots[pos_x][pos_y][pos_z] == '0')) {
      player1.setShot(pos_x, pos_y, pos_z, 'miss');
    }
    
  }
  
}

Game.prototype.getBlurb = function() {
  return this.blurb;
}

exports.Game = Game;