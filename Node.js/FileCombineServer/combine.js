var fs = require('fs'),
  path = require('path');
var paths = process.argv.slice(2);
var output = [];
(function next(i, len) {
  if (i < len - 1) {
    fs.readFile(paths[i], function (err, data) {
      if (err) {
        callback(err);
      } else {
        output.push(data);
        next(i + 1, len);
      }
    });
  } else {
    fs.writeFile('./' + paths[len - 1], Buffer.concat(output), function (err) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('ok');
      }
    });
  }

})(0, paths.length);