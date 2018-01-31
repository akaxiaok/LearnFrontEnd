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
      var key = Object.keys(files)[0];
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

app.post('/post', function (req, res, next) {
  res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
  res.write('received post\n\n');
  res.end();
});
app.get('/get', function (req, res, next) {
  res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
  res.write('received get\n\n');
  res.end();
});

app.listen(3000, function () {
  console.log('server start at port 3000\n');
});


const crossDomainApp = express();


crossDomainApp.all('*', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // 允许哪些域进行跨域请求
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Custom-Header"); // 允许哪些自定义头部字段
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); // 支持哪些跨域方法
  // Access-Control-Allow-Credentials 是否允许携带 Cookie,允许携带 Cookie 的域必须在 Access-Control-Allow-Origin 明确指定，不能是 *，同时还需要在客户端 XHR 里指定 withCredentials:true
  res.header("Access-Control-Allow-Credentials", true);
  res.cookie('express-cookie', 'myCookie');
  // Access-Control-Expose-Headers XMLHttpRequest 对象 getResponseHeader 方法能够读取的响应头部字段 默认为 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma
  res.header("Access-Control-Expose-Headers", "Date");
  res.header('Access-Control-Max-Age', 60); // 在 n 秒时间内不必再次预检
  res.header("X-Powered-By", ' 3.2.1');
  //这段仅仅为了方便返回json而已
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
});

crossDomainApp.post('/post', function (req, res, next) {
  res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
  res.write('crossDomainApp received post\n\n');
  res.end();

});

crossDomainApp.get('/get', function (req, res, next) {
  res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
  res.write('crossDomainApp received get\n\n');
  res.end();

});

crossDomainApp.listen(3001, function () {
  console.log('crossDomainApp start at port 3001\n');
});