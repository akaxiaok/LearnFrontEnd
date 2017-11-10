// 默认绑定
name = 'global';

function defaultBind() {
  console.log(this.name);
}

defaultBind(); // 'global'

function strictDefaultBind() {
  'use strict';
  console.log(this.name);
}

// strictDefaultBind(); //TypeError: Cannot read property 'name' of undefined

// 隐式绑定

function implicitBind() {
  console.log(this.name);
}

var obj = {
  name: 'obj',
  implicitBind: implicitBind // 一个引用
};

obj.implicitBind(); // 'obj' 绑定在 obj 上

// 隐式丢失

var loseBind = obj.implicitBind;  // 一个新的引用

loseBind(); // 'global' 绑定丢失

function doFunction(func) {
  func(); // 参数赋值给 func，func 是原方法的一个新的引用
}

doFunction(obj.implicitBind); // 'global' 绑定丢失

// 显示绑定
function explicitBind() {
  console.log(this.name);
}

var bindTo = {
  name: 'bindTo'
};

explicitBind.call(bindTo); // bindTo
// 硬绑定  ES6 Function.prototype.bind
function hardBind(func, bindTo) {
  return function () {
    return func.apply(bindTo, arguments);
  }
}

var bound = hardBind(explicitBind,bindTo);
bound();//bindTo
bound.call({ name: 'newBind' });// bindTo 无法改变
// new bind
// 对函数执行构造调用（即 new someFunction() ）时
// 会创建一个新对象，构造原型链，然后将函数 this 绑定到这个对象，如果函数没有返回其他对象，则会默认返回这个新建的对象

function newBind(name) {
  this.name = name;
}

var newBound = new newBind('newBind');
console.log(newBound.name);

// 优先级 new > hard > explicit > implicit > default
// 例外
// 1.显示绑定 null undefined
// 2.间接引用
var anotherObj = {
  name:'another'
};
var assignReturn = anotherObj.bound = obj.implicitBind; // 赋值表达式返回 implicitBind 函数的引用， assignReturn 保存了这个引用
anotherObj.bound(); // another
assignReturn(); // 这里适用默认绑定 global
// 3.箭头函数会继承外层函数调用的 this 绑定。