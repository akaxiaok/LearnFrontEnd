console.log('screenX', window.screenX);
console.log('screenY', window.screenY);
console.log('screenTop', window.screenTop);
console.log('screenLeft', window.screenLeft);
document.getElementById('openWin').addEventListener('click', function () {
  var newWin = window.open('http://www.github.com', null, 'height=400,width=400');
  newWin.moveTo(200,200);
});
document.getElementById('openIFrame').addEventListener('click', function () {
  // 不添加 协议头 就是相对路径
  window.open('www.github.com', 'newFrame');
});
