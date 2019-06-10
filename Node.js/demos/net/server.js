const net = require('net');

const server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        socket.write('ok');
        console.log('data received', data.toString());
    });
});

server.listen(8848, function () {
    console.log('server start');
});