//zero-one
function z(){
  return ''+Math.round(Math.random());
}

Player = function() {
  
  this.cube = [];
  this.shots = [];
  this.score = 0

  for(i=0; i<3; i++){
    var andar = [];
    for(j=0; j<3; j++){ 
      andar.push([z(),z(),z()]);
    }
    this.cube.push(andar);
  }
  for(i=0; i<3; i++){
    var andar = [];
    for(j=0; j<3; j++){ 
      andar.push(["0","0","0"]);
    }
    this.shots.push(andar);
  }
  
}

Player.prototype.upScore = function() {
  this.score += 1;
}

Player.prototype.getScore = function() {
  return this.score;
}

Player.prototype.getCube = function() {
  return this.cube;
}

Player.prototype.getShots = function() {
  return this.shots;
}

Player.prototype.setShot = function(pos_x, pos_y, pos_z, shot) {
  this.shots[pos_x][pos_y][pos_z] = shot;
}

exports.Player = Player;