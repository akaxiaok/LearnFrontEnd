const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function P(fn) {
  const self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof P) {
      return value.then(resolve, reject);
    }
    if (self.status === PENDING) {
      setTimeout(() => {
          self.status = FULFILLED;
          self.value = value;
          self.onFulfilledCallbacks.forEach(callback => callback(self.value));
      })
    }
  }

  function reject(error) {

    if (self.status === PENDING) {
      setTimeout(() => {
          self.status = REJECTED;
          self.error = error;
          self.onRejectedCallbacks.forEach(callback => callback(self.error));
      })
    }

  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }


}

P.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  let bridgePromise;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : e => {
    throw e
  };
  if (self.status === FULFILLED) {
    return bridgePromise = new P(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }

      })
    })
  }
  if (self.status === REJECTED) {
    return bridgePromise = new P((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
  if (self.status === PENDING) {
    return bridgePromise = new P((resolve, reject) => {
      self.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(error => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

function resolvePromise(bridgePromise, x, resolve, reject) {
  if (bridgePromise === x) {
    return reject(new TypeError('Circular reference'));
  }
  let called = false;
  if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (!called) {
            called = true;
            resolvePromise(bridgePromise, y, resolve, reject);
          }
        }, error => {
          if (!called) {
            called = true;
            reject(error);
          }
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if (!called) {
        called = true;
        reject(e);
      }
    }
  } else {
    resolve(x);
  }
}

P.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

P.deferred = function () {
  let defer = {};
  defer.promise = new P((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};


module.exports = P;

