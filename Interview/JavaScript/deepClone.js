const _ = require('../../lodash');

Object.prototype.go = 'gogogo';

const obj = {
    str: 'text',
    obj: {
        foo: 'foo',
        bar: 'bar'
    },
    arr: [
        {a: '1'}, 1, 3, 5, 7, 9
    ],
    func: function () {
        console.log('function run');
    }
};
const clone = _.cloneDeep(obj);

clone.func();
console.log(clone.arr[0] === obj.arr[0]);


function deepClone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    } else {
        const clone = obj instanceof Array ? [] : {};
        for (const o in obj) {
            if (obj.hasOwnProperty(o)) {
                const value = obj[o];
                if (typeof value === 'function') {
                    clone[o] = value;
                } else if (typeof value === 'object') {
                    clone[o] = deepClone(obj[o]);
                } else {
                    clone[o] = value;
                }
            }
        }
        return clone;
    }

}

const clone2 = deepClone(obj);
console.log(clone2);
console.log(clone2.arr === obj.arr);
console.log(clone.arr[0] === obj.arr[0]);
console.log(clone2 === obj);

const arr = [{a: [3, 2, 1], b: [{c: 'c'}]},3];

const cloneArr = deepClone(arr);
console.log(cloneArr);
console.log(cloneArr[0] === arr[0]);
console.log(cloneArr[0].b[0] === arr[0].b[0]);
