var cp = require('child_process');
var child1 = cp.fork(__dirname +  '/child.js');
var child2 = cp.fork(__dirname + '/child.js');

var server = require('net').createServer();
server.listen(8848, function () {
    child1.send('server', server);
    child2.send('server', server);
    server.close(function () {
        console.log('parent closed');
    });
});