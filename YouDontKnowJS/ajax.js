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
let util = {
  ajax: ajax,
  request: request
};
module.exports = util;