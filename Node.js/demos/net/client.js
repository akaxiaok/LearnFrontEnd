const net = require('net');

const client = net.connect({port: 8848}, function () {
    for (let i = 0; i < 10; i++) {
        client.setNoDelay(true);
        client.write(''+i);
    }
    client.end();
});

client.on('data',function (data) {
    console.log(data.toString());
});