const net = require('net');

const client = net.connect({ port: 3000 }, function () {
  client.setNoDelay(true);
  client.write('GET /get HTTP/1.1\n'+'\n');
  client.end();
});

client.on('data', function (data) {
  console.log(data.toString());
});
