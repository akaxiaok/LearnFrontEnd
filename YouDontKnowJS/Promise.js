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
  then: function (cb,errCb) {
    cb('bar');
    errCb('err');
  }
};

Promise.resolve(bar).then(function (val) {
  console.log(val + ' done');
}, function (err) {
  console.log(err + ' done');
  //never run
});