var _ =require('../lodash');

function timeoutPromise(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('Timeout');
    }, delay);
  });
}

function foo(delay, isError) {
  return new Promise(function (resole, reject) {
    if (isError) {
      reject('an error');
    }
    setTimeout(function () {
      resole('foo done after ' + delay);
    }, delay);
  });
}

Promise.race([foo(4000), timeoutPromise(3000)]).then(function (val) {
  // foo done
  console.log(val);
}, function (err) {
  // check err
  // foo reject or timeout
  console.log(err);
});
Promise.race([foo(1000), timeoutPromise(3000)]).then(function (val) {
  // foo done
  console.log(val);
}, function (err) {
  // check err
  // foo reject or timeout
  console.log(err);
});
Promise.race([foo(1000, true), timeoutPromise(3000)]).then(function (val) {
  // foo done
  console.log(val);
}, function (err) {
  // check err
  // foo reject or timeout
  console.log(err);
});

var bar = {
  then: function (cb, errCb) {
    cb('bar');// resolve
    errCb('err');// reject
  }
};

Promise.resolve(bar).then(function (val) {
  console.log(val + ' done');
}, function (err) {
  console.log(err + ' done');
  //never run
});


Promise.all([foo(1000), foo(2000)]).then(function (val) {
  return Promise.reject('err after all');
}).then(null, function (err) {
  console.log(err);
});

function promiseNumber(isError) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (isError) {
        reject('a error from promiseNumber');
      }
      resolve(Math.round(Math.random() * 10));
    }, Math.random() * 5);
  });
}

function promiseString(isError) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (isError) {
        reject('a error from promiseString');
      }
      resolve('a string from promiseString');
    }, Math.random() * 5);
  });
}

var p1 = promiseNumber();
var p2 = promiseNumber(true);
var p3 = promiseString();
var p4 = promiseString(true);

// map promise
if (!Promise.map) {
  Promise.map = function (vals, cb) {
    return Promise.all(
      vals.map(function (val) {
        return new Promise(function (resolve, reject) {
          cb(val, resolve);
        })
      })
    )
  }
}

Promise.map([p1, p2, p3, p4], function (pr, resolve, reject) {
  Promise.resolve(pr).then(function (v) {
      if (_.isNumber(v)) {
        resolve(v * 2)
      } else {
        resolve(v);
      }
    },
    resolve
  )
}).then(function (vals) {
  console.log(vals);
});

// new Promise(function(resolve,reject){}) 创建 promise
// resolve() 根据传入的参数决定是完成这个 promise 还是继续执行等待完成
// reject() 拒绝这个 promise

// Promise.resolve() 根据传入的参数决定是返回一个已完成的 promise 还是继续等待结果（传入的是 thenable），或者直接将传入的 promise 原样返回
// Promise.reject() 返回一个拒绝的 promise

// Promise.all([p1,p2]) 返回一个新 promise，数组中的任何 promise 被拒绝，则立即拒绝, 新 promise 的获得拒绝值，如果所有 promise 都完成，获得一个包含所有 promise 完成值的数组
// Promise.all([]) 传入空数组 立即完成
// Promise.race([p1,p2]) 返回一个新 promise，其值为第一个完成或者拒绝的 promise 的值
// Promise.race([]) 传入空数组 会挂起，永远不会决议

Promise.all([p1,p3]).then(function (vals) {
    console.log(vals);
});

Promise.all([p1,p2]).then(function (vals) {
  console.log(vals);
},function (err) {
  console.log(err);
});
