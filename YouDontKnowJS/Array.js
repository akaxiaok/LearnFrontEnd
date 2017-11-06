// { length: 1000 } 为类数组，每个元素都是 undefined
var b = Array.apply(null, { length: 1000 }).map(function (v, i) {
  return i;
});
// console.log(b);

var a = Array.from({ length: 1000 }).map(function (v, i) {
  return i;
});
// console.log(a);


// keys() 返回遍历器对象
// ... 扩展运算符把具有 Iterator 接口的对象转换为数组
console.log([...Array(10).keys()]);
