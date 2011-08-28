// Config
PLAYER_NAME = 'player1';
SERIAL_PORT = '/dev/tty.usbserial-A8004Jre';
HOST_NAME = 'localhost';
HOST_PORT = 8080;

var http = require('http');
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort(SERIAL_PORT);


var coordinate = '000';

var options = {
  host: HOST_NAME,
  port: HOST_PORT,
  path: '/fire/'+PLAYER_NAME+'/'+coordinate
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})