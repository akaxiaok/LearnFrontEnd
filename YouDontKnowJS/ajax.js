let ajax = function (url, cb) {
  setTimeout(function () {
    if (ajax.isError) {
      cb(new Error('ajax error'));
    } else {
      cb(undefined, `you request url: ${url}`);
    }
  }, ajax.timeout||1000);
};
module.exports = ajax;