var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var LOCK = 'lock';

function resolve(value) {
  if (this === value) {
    return reject.bind(this)(new TypeError('Chaining cycle detected for promise!'))
  }
  let called = false;
  if (value instanceof P) {
    if (value.status === PENDING || value.status === LOCK) {
      this.status = LOCK;
      var self = this;
      value.then(function (v) {
        self.status = PENDING;
        resolve.bind(self)(v);
      }, function (reason) {
        self.status = PENDING;
        reject.bind(self)(reason);
      })
    } else if (value.status === REJECTED) {
      reject.bind(this)(value.reason);
    } else if (value.status === FULFILLED) {
      resolve.bind(this)(value.value);
    }
  } else if (value && (typeof value === 'object' || typeof value === 'function')) {
    try {
      let then = value.then;
      if (typeof then === 'function') {
        then.call(value, y => {
          if (!called) {
            called = true;
            resolve.bind(this)(y);
          }
        }, reason => {
          if (!called) {
            called = true;
            reject.bind(this)(reason);
          }
        })
      } else {
        if (this.status === PENDING) {
          this.status = FULFILLED;
          this.value = value;
          setTimeout(() => {
            this.onFulfilledCallbacks.forEach((callback) => {
              callback(value);
            })
          })
        }

      }
    } catch (e) {
      if (!called) {
        called = true;
        reject.bind(this)(e);
      }
    }
  } else {

    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      if (this.onFulfilledCallbacks.length) {
        setTimeout(() => {
          this.onFulfilledCallbacks.forEach((callback) => {
            callback(value);
          })
        })
      }
    }

  }
}

function reject(reason) {
  if (this.status === PENDING) {
    this.status = REJECTED;
    this.reason = reason;
    if (this.onRejectedCallbacks.length) {
      setTimeout(() => {
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason);
        });
      })
    }
  }
}

function P(fn) {
  this.status = PENDING;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  this.value = undefined;
  try {
    fn(resolve.bind(this), reject.bind(this))
  } catch (e) {
    reject.bind(this)(e);
  }

}


P.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : e => {
    throw e
  };
  if (this.status === PENDING || this.status === LOCK) {
    return new P((resolve, reject) => {
      this.onFulfilledCallbacks.push(y => {
        try {
          let x = onFulfilled(y);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedCallbacks.push(reason => {
        try {
          // if onRejected is not function,
          let x = onRejected(reason);
          resolve(x); // resolve p2;
        } catch (e) {
          reject(e); // reject p2
        }
      })
    })
  }
  if (this.status === FULFILLED) {
    return new P((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      })
    });
  }
  if (this.status === REJECTED) {
    return new P((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      })
    });
  }
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
