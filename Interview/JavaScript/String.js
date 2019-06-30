console.info('String\'s methods');

var str = 'test string';
var str64 = "𠮷";
console.log(
  String.fromCharCode(0x20BB7),
  // 能识别 32 位 Unicode 码点
  String.fromCodePoint(0x20BB7)
);

console.log(
  str.charAt(0),
  str.charCodeAt(0),
  str.codePointAt(0),
);
console.log(
  str64.charAt(0),
  str64.charCodeAt(0),
  // 返回 32 位 Unicode 码点
  str64.codePointAt(0),
);

console.log(
  str.padStart(20),
  str.padStart(20, '@'),
  str.padEnd(20),
  str.padEnd(20, '@'),
  str.repeat(2)
);
console.log(
  // 第二个参数指定查询前 n 个字符
  str.endsWith('t', 4),
  // 第二个参数指定从第 n 个字符之后开始查询
  str.startsWith('s', 5),
  // 第二个参数指定从第 n 个字符之后开始查询
  str.includes('str', 5),
  // 返回匹配字符串之前有几个字符
  // 第二个参数指定从第 n 个字符之后开始查询
  str.indexOf('s'),
  str.indexOf('s', 5),
  // 最后一次出现的位置
  // 第二个参数指定查询前 n 个字符
  str.lastIndexOf('s'),
  str.lastIndexOf('s', 4),
);


console.log(
  str.concat(str64),
  // 提取一个新字符串，但不修改原字符串
  // 第一个参数为起始位置，第二个参数为结束位置
  // 新字符串不包含结束位置
  // 参数为负，则加上原字符串长度
  str.slice(1,5),//'est '
  // 分割成数组
  str.split(' '),
  // 第一个参数为起始位置，第二个参数为新字符串长度
  // 参数为负，则加上原字符串长度
  str.substr(-2,2),
  // 第一个参数为起始位置，第二个参数为结束位置
  // 新字符串不包含结束位置
  // 参数为负，则为 0
  // 较小的参数会被提前
  str.substring(0,2),
  str.substring(-1,2),
  str.substring(3,2)
);
console.log(
  str.toLowerCase(),
  str.toUpperCase(),
);
console.log(
  str.search(/s/),
  str.search(/s/g),
  str.match(/str|(te)/),
  str.match(/str|(te)/g),
  str.replace('test', 'new'),
  str.replace(/s/g, 'S'),
  str.replace('s',function (v) {
    return v.toUpperCase();
  })
);