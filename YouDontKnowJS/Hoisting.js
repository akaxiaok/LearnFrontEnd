// Functions First
foo();

var foo;

// 提升到最顶部
function foo() {
  console.log(1);
}

foo = function () {
  console.log(2);
};


var baz = 1;
function bar() {
  baz = 10; // 函数作用域
  return;
  function baz() {} // 提升
}
bar();
console.log(baz); // 1


