var http = require('http');

var options = {
  host: 'localhost',
  port: 8080,
  path: '/fire/player1/000'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})