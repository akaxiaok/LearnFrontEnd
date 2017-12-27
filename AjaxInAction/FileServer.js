var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

const app = express();
app.use(express.static('./'));

app.post('/form', function (req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './' });


  //上传完成后处理
  //fields 一般的表单元素
  //files 文件
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var key= Object.keys(files)[0];
      var inputFile = files[key][0];

      var uploadedPath = inputFile.path;
      var dstPath = './' + inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }

    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    res.write('received upload:\n\n');
    res.end(util.inspect({ fields: fields, files: filesTmp }));
  });
});

app.listen(3000, function () {
  console.log('server start at port 3000\n');
});
