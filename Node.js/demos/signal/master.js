const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen('8848');

const workers = {};


const createWorker = function () {
    const worker = fork(__dirname + '/child');
    worker.on('exit', () => {
        console.log(`Worker pid ${worker.pid} exited`);
        delete workers[worker.pid];
    });
    worker.on('message', (m) => {
        if (m === 'suicide') {
            createWorker();
        }
    });
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log(`Create worker. pid: ${worker.pid}`);
};

for (let i = 0; i < cpus.length; i++) {
    createWorker();
}

process.on('exit', () => {
    for (let worker of workers) {
        worker.kill();
    }
});


