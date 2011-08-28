// Config
PLAYER_NAME = 'player1';
SERIAL_PORT = '/dev/tty.usbserial-A700dE8G';
HOST_NAME = 'localhost';
HOST_PORT = 8080;

var http = require('http');
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort(SERIAL_PORT, {baudrate:57600});

var xyz = 0;

serialPort.on("data", function (data) {
    xyz = parseInt(data);
    //para nao vir numeros quebrados
    if (xyz>=100){
//      console.log("Dado: "+xyz);
    }  
});



var coordinate = '000';
var options = {
  host: HOST_NAME,
  port: HOST_PORT,
  path: '/fire/'+PLAYER_NAME+'/'+coordinate
};

// http.get(options, function(res) {
//   console.log("Got response: " + res.statusCode);
// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// })