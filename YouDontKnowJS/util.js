let ajax = function (url, cb) {
  setTimeout(function () {
    if (ajax.isError) {
      cb(new Error(`ajax request url ${url} error`));
    } else {
      cb(undefined, `done, ajax request url: ${url}`);
    }
  }, ajax.timeout || 1000);
};

let request = function (url) {
  return new Promise(function (resovle, reject) {
    setTimeout(function () {
      if (request.isError) {
        reject(`request reject from request ${url}`);
      } else {
        resovle(`return value from request ${url}`);
      }
    }, request.timeout || 1000);
  })
};

function run(gen) {
  let args = [].slice.call(arguments, 1), it;
  it = gen.apply(this, args);
  return Promise.resolve().then(function handleNext(value) {
    let next = it.next(value);
    return (function handleResult(next) {
      if (next.done) {
        return next.value;
      } else if (typeof next.value == "function") {
        return new Promise(function (resolve, reject) {
          next.value(function (err, msg) {
            if (err) {
              reject(err);
            } else {
              resolve(msg);
            }
          });
        }).then(handleNext, function handleErr(err) {
          return Promise.resolve(it.throw(err)).then(handleResult);
        });
      }
      else {
        return Promise.resolve(next.value).then(handleNext, function handleErr
          (err) {
          return Promise.resolve(it.throw(err)).then(handleNext);
        })
      }
    })(next);
  });
}

let util = {
  ajax: ajax,
  request: request,
  run: run,
};


module.exports = util;