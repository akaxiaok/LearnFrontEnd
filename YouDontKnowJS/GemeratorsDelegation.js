let { run, request } = require('./util');

function* foo() {
  try {
    console.log('inside:', yield 'B');
  } catch (err) {
    console.log('error caught inside *foo():', err);
  }
  console.log('inside:', yield 'C');

  throw 'D';
}

function* bar() {
  console.log('inside:', yield 'A');

  try {
    console.log('inside:', yield* foo());
  } catch (err) {
    console.log('error caught inside *bar():', err);
  }
  console.log('inside:', yield* ['E1', 'E2', 'E3']); // 可迭代对象

  console.log('inside:', yield* baz());

  console.log('inside:', yield 'H');
}

function* baz() {
  console.log('inside:', yield 'F');
  throw 'G';
}

let it = bar();

console.log('outside:', it.next().value);
console.log('outside:', it.next(1).value);
console.log('outside:', it.throw(2).value);
console.log('outside:', it.next(3).value);
console.log('outside:', it.next(4).value);
console.log('outside:', it.next(5).value);
console.log('outside:', it.next(6).value);

try {
  console.log('outside:', it.next(7).value);
} catch (err) {
  console.log('error caught outside:', err);
}

(function () {
  function* foo(val) {
    if (val > 1) {
      val = yield* foo(val - 1);
    }
    return yield request(val);
  }

  function* bar() {
    let r1 = yield* foo(3);
    console.log(r1);
  }

  run(bar);
})();