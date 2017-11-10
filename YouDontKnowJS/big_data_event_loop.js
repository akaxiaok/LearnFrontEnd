var res = [];

function response(data) {
  // 一次处理一部分
  var chunk = data.slice(0, 1000);
  res = res.concat(
    // 对这部分数据进行处理
    chunk.map(function (val) {
      return val * 2;
    })
  );
  if (data.length > 0) {
    // 剩下的下一次处理
    setTimeout(function () {
      response(data);
    }, 0);
  }
}
ajax('http://some.url.1',response);
ajax('http://some.url.2',response);

// 没有处理顺序问题