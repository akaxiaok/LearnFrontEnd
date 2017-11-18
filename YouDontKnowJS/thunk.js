let { run } = require('./util');

function thunkify(fn) {
  return function () {
    let args = [].slice.call(arguments);
    return function (cb) {
      args.push(cb);
      return fn.apply(null, args);
    }
  }
}

function foo(x, y, cb) {
  setTimeout(function () {
    cb(null, x + y);
  }, 100);
}

let fooThunkory = thunkify(foo);
let fooThunk1 = fooThunkory(3, 4);
let fooThunk2 = fooThunkory(5, 6);

fooThunk1(function (err, sum) {
  console.log(sum);
});
fooThunk2(function (err, sum) {
  console.log(sum);
});

function* bar() {
  let val = yield fooThunk1();
  console.log(val);
}

run(bar);