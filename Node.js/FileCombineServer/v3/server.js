var fs = require('fs'),
  path = require('path'),
  http = require('http');
var MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript'
};

main(process.argv.slice(2));


function main(argv) {
  if (!argv[0]) {
    argv[0] = path.join(__dirname, '../config.json');
  }
  var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
    root = config.root || '.',
    port = config.port || 80;
  var server = http.createServer(function (req, res) {
    var urlInfo = parseURL(root, req.url);
    validateFiles(urlInfo.pathNames, function (err, pathNames) {
      if (err) {
        res.writeHead(403);
        res.end(err.message);
      } else {
        res.writeHead(200, { 'Content-Type': urlInfo.mime });
        outputFiles(pathNames, res);
      }
    })
  }).listen(port);
  process.on('SIGTERM', function () {
    server.close(function () {
      console.log('main exit');
      precess.exit(0);
    })
  })
}

function outputFiles(pathNames, writer) {
  (function next(i, len) {
    if (i < len) {
      var reader = fs.createReadStream(pathNames[i]);
      reader.pipe(writer, { end: false });
      reader.on('end', function () {
        next(i + 1, len);
      })
    } else {
      writer.end();
    }
  })(0, pathNames.length);
}

function validateFiles(pathNames, callback) {
  (function next(i, len) {
    if (i < len) {
      fs.stat(pathNames[i], function (err, stats) {
        if (err) {
          callback(err);
        } else if (!stats.isFile()) {
          callback(new Error());
        } else {
          next(i + 1, len);
        }
      })
    } else {
      callback(null, pathNames);
    }
  })(0, pathNames.length)
}


function parseURL(root, url) {
  var base, pathNames, parts;
  if (url.indexOf('??') === -1) {
    url = url.replace('/', '/??');
  }
  parts = url.split('??');
  base = parts[0];
  pathNames = parts[1].split(',').map(function (value) {
    return path.join(root, base, value);
  });
  return {
    mime: MIME[path.extname(pathNames[0])] || 'text/plain',
    pathNames: pathNames
  }
}