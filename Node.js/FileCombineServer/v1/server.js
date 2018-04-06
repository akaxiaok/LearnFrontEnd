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
    argv[0] = __dirname + '/config.json';
  }
  var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
    root = config.root || '.',
    port = config.port || 80;
  http.createServer(function (req, res) {
    var urlInfo = parseURL(root, req.url);
    combineFiles(urlInfo.pathNames, function (err, data) {
      if (err) {
        res.writeHead(403);
        res.end(err.message);
      } else {
        res.writeHead(200, { 'Content-Type': urlInfo.mime })
        res.end(data);
      }
    })
  }).listen(port);
}


function combineFiles(pathNames, callback) {
  var output = [];
  (function next(i, len) {
    if (i < len) {
      fs.readFile(pathNames[i], function (err, data) {
        if (err) {
          callback(err);
        } else {
          output.push(data);
          next(i + 1, len);
        }
      });
    } else {
      callback(null, Buffer.concat(output));
    }

  })(0, pathNames.length);
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