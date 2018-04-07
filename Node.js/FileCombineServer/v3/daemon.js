var cp = require('child_process');
var worker;

function spawn(server, config) {
  worker = cp.spawn('node', ['--inspect-brk=9222', server]);
  worker.on('exit', function (code) {
    if (code != 0) {
      spawn(server, config);
    }
  })
}

function main(argv) {
  spawn('server.js', argv[0]);
  process.on('SIGTERM', function () {
    worker.kill();
    console.log('daemon exit');
    process.exit(0);
  })
}

main(process.argv.slice(2));
