var player = require('./player').Player;

Game = function(blurb) {
  this.blurb = blurb;
  
}

Game.prototype.initGame = function() {
  this.player1 = new Player();
  this.player2 = new Player();
  this.turn = 'player1';
  this.player2_status = 'offline';
}

Game.prototype.getStatusPlayer2 = function(status) {
  return this.player2_status;
}

Game.prototype.setStatusPlayer2 = function(status) {
  this.player2_status = status;
}

Game.prototype.getTurn = function() {
  return this.turn;
}

Game.prototype.setTurn = function(player) {
  this.turn = player;
}

Game.prototype.getBlurb = function() {
  return this.blurb;
}

Game.prototype.fire = function(player_name, pos_x, pos_y, pos_z) {
    
  if (player_name == 'player1') {    
    if ((this.player2.cube[pos_x][pos_y][pos_z] == "1") && (this.player1.shots[pos_x][pos_y][pos_z] == '0')) {
      this.player1.setShot(pos_x, pos_y, pos_z, 'hit');
      this.player1.upScore();
    }
    if ((this.player2.cube[pos_x][pos_y][pos_z] == "0") && (this.player1.shots[pos_x][pos_y][pos_z] == '0')) {
      this.player1.setShot(pos_x, pos_y, pos_z, 'miss');      
    } 
    
  }
  if (player_name == 'player2') {    
    if ((this.player1.cube[pos_x][pos_y][pos_z] == "1") && (this.player2.shots[pos_x][pos_y][pos_z] == '0')) {
      this.player2.setShot(pos_x, pos_y, pos_z, 'hit');
      this.player2.upScore();
    }
    if ((this.player1.cube[pos_x][pos_y][pos_z] == "0") && (this.player2.shots[pos_x][pos_y][pos_z] == '0')) {
      this.player1.setShot(pos_x, pos_y, pos_z, 'miss');
    }
    
  }
  
}

exports.Game = Game;