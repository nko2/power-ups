http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': "text/plain"});
    res.end('Aqui aparecerá a matriz.');
    
    //recebe dado do arduino e manda para o servidor
    
    
    
}).listen(8081);