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

// Player.prototype.shoot = function(pos_x, pos_y, pos_z) {
//   
//   if ((this.cube[pos_x][pos_y][pos_z] == "1") && (this.shots[pos_x][pos_y][pos_z] == '0')) {
//     return true;
//   }
//   if ((this.cube[pos_x][pos_y][pos_z] == "0") && (this.shots[pos_x][pos_y][pos_z] == '0')) {
//     this.shots[pos_x][pos_y][pos_z] = '1';
//     return false;
//   }
//   
//   this.shots[pos_x][pos_y][pos_z] = '1';
// }


exports.Player = Player;