// 迭代器 iterator 具有 next 方法的对象
// 可迭代 iterable 包含迭代器的对象
let ajax = require('./ajax');
let something = (function () {
  let nextValue;
  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      if (nextValue === undefined) {
        nextValue = 1;
      } else {
        nextValue = (3 * nextValue) + 6;
      }
      return { done: false, value: nextValue };
    }
  };
})();

console.log(something.next().value);
console.log(something.next().value);
console.log(something.next().value);
console.log(something.next().value);

function* someother() {
  let nextValue;
  try {
    while (true) {
      if (nextValue === undefined) {
        nextValue = 1;
      } else {
        nextValue = (3 * nextValue) + 6;
      }
      yield nextValue;
    }
  } catch (e) {

  } finally {
    console.log('do some clean');
  }
}

let lt = someother();
console.log(lt.next().value);
console.log(lt.next().value);
console.log(lt.next().value);
console.log(lt.next().value);
console.log(lt.return('end').value); // end 手动触发 finally

// 构造器返回一个迭代器，该迭代器也是 可迭代 的，可以用于 for of
for (let v of someother()) {
  console.log(v);
  if (v > 500) {
    break; // break return 触发 finally
  }
}




function* main() {
  try {
    let text = yield foo(11, 31);
    console.log(text);
  } catch (err) {
    console.error(err.message);
  }
}

function foo(x, y) {
  ajax.isError = true;
  ajax(`url?x=${x}&y=${y}`, function (err, data) {
    if (err) {
      it.throw(err); // 交给生成器处理
    }
    else {
      it.next(data);
    }
  })
}
let it = main();
it.next();