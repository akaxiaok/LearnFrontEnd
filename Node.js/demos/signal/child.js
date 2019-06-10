const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`handle by child, pid is ${process.pid}\n`);
    throw new Error('new error');
});

let worker;
process.on('message', (m, tcp) => {
    if (m === 'server') {
        worker = tcp;
        worker.on('connection', (socket) => {
            server.emit('connection', socket);
        })
    }
});

process.on('uncaughtException', () => {
    console.log('worker close');
    process.send('suicide');
    worker.close(() => {
        console.log(`pid ${process.pid} exit`);
        process.exit();
    });
    setTimeout(()=>{
        process.exit(1);
    }, 10000);
});