var Cube = require('../lib/player').Player;

var player1 = new Player()
    , player2 = new Player();

player1.setScore();

console.log(player1.getParams());
console.log(player2.getParams());