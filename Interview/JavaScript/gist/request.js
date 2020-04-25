var request = function (options) {
    const {method, url, params, callback} = options;
    var http = new XMLHttpRequest();
    http.open(method, url, async);
    return http;
};
var get = function (url, params, callback) {
    return request('get', url, true);
};
var post = function (url) {
    return request('post', url, true);
};
