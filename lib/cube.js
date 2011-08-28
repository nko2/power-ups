Cube = function() {
  this.player_cube = ''
  for (i=0;i<27;i++) {
    if (Math.random() <= 0.5) {
      this.player_cube += '0';
    }else{
      this.player_cube += '1'; 
    }
  }
}

Cube.prototype.getParams = function() {
  return this.player_cube;
}

exports.Cube = Cube;