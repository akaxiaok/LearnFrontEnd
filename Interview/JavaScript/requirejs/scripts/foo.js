define(['lodash'], function (_) {
    return function (str) {
        console.log(_.padEnd(str, 20, '!'));
    }
});