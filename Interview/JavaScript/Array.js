var array = [1, 2, 3];
console.log(
  array.toString(),
  array.toLocaleString()
);
// 栈方法
// push 返回数组长度
console.log(array.push(4), array);
// pop 返回最后一个元素
console.log(array.pop(), array);

// 队列方法
// unshift 返回数组长度
console.log(array.unshift(-1), array);
// shift 返回第一个元素
console.log(array.shift(), array);

// 排序
console.log(array.sort(function (a, b) {
  return b - a;
}), array);
console.log(array.reverse(), array);

// 操作
// 不影响原数组
console.log(array.concat(), array === array.concat());
// 不影响原数组
console.log(array.slice(), array.slice() === array);
console.log(array.concat(4, [5, 6]));
// 不包含结束位置
// 为负加 length
console.log(array.slice(1, 2));

// splice arg1 起始位置， arg2 删除的数量 ...args 插入的元素
// 返回被删除的元素
// 删除
console.log(array.splice(0, 2), array);
// 插入
console.log(array.splice(0, 0, 1, 2), array);
// 替换
console.log(array.splice(0, 3, '1', '2', '3'), array);

array = [1, 2, 3];


// 查找
console.log(array.indexOf(2));
console.log(array.lastIndexOf(2));

// 迭代
console.log(array.every(function (v) {
  return v < 4;
}));
console.log(array.filter(function (v) {
  return v > 1;
}));
console.log(array.some(function (v) {
  return v === 3;
}));
console.log(array.map(function (v, i) {
  console.log(v, i);
  return v + 1;
}));
console.log(array.forEach(function (v, i) {
  console.log(v, i);
}));

console.log(array.reduce(function (all, cur, i, arr) {
  console.log(all, cur, i, arr);
  return all + cur;
}));
console.log(array.reduce(function (all, cur, i, arr) {
  console.log(all, cur, i, arr);
  return all + cur;
}, 1000));