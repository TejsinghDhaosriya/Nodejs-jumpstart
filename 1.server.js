var  http = require('http');
http.createServer((req,res)=>{
res.writeHead(200,{'Context-Type':'text/plain'});
res.end('Hello world in nodejs');

}).listen(8081);

console.log('Server is runing');