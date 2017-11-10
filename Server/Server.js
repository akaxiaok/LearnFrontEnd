var http = require('http');
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function (req, res) {
    
  var post = '';

  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  req.on('data', function(chunk){
    post += chunk;
  });
  var url = req.url;
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function(){
    // 解析参数
    post = querystring.parse(post);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    if(post) { // 输出提交的数据
      res.write("post body：" + util.inspect(post));
      res.write('<br />');
      res.write("url：" + util.inspect(url));
    }
    res.end();
  });
});
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');