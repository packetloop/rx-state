var nodeStatic = require('node-static');
var fs = require('fs');
var file = new nodeStatic.Server('./public', {cache: false});

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response).addListener('error', function () {
      response.end(fs.readFile('./public/index.html'));
    });
  }).resume();
}).listen(8080);