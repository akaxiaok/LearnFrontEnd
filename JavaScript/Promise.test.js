var P = require('./Promise');
var p = new P(function (resolve, reject) {
    resolve(new P(function (resolve2, reject2) {
        setTimeout(resolve2, 1000)
    }));
    reject();
});
var t1 = new P(function (resolve2, reject2) {
    resolve2();
});

var t2 = new P(function (resolve2, reject2) {
    reject2();
});
var p2 = new P(function (resolve, reject) {
    resolve(t1);
    reject();
});
var p3 = new P(function (resolve, reject) {
    resolve(t2);
    reject();
});

// x 为 Promise
// 如果 x 为 Promise ，则使 promise 接受 x 的状态
//
// 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
// 如果 x 处于执行态，用相同的值执行 promise
// 如果 x 处于拒绝态，用相同的据因拒绝 promise
p.then(function () {
    console.log(1) // correct
}, function () {
    console.log(2)
});
p2.then(function () {
    console.log('p2 resolve') // correct
}, function () {
    console.log('p2 reject')
});
p3.then(function () {
    console.log('p3 resolve')
}, function () {
    console.log('p3 reject') // correct
});





var p = new Promise(function (resolve, reject) {
    resolve(new Promise(function (resolve2, reject2) {
        setTimeout(resolve2, 1000)
    }))
    reject();
});

p.then(function () {
    console.log(1) // correct
}, function () {
    console.log(2)
});

// try change P to Promise
var myP = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(myP);
    }, 0);
});


try {
    myP.then(function (value) {
        console.log('1', value);
    }, function (err) {
        console.log('e1', err);
        return err.message;
    }).then(function (value) {
        console.log('2', value);
    }, function (err) {
        console.log('e2', err);
    });
} catch (e) {
    console.log('catch', e);
}



