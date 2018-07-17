const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function P(fn) {
  let self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallbacks.forEach(callback => callback(self.value));
      }
    })

  }

  function reject(error) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.error = error;
        self.onRejectedCallbacks.forEach(callback => callback(self.value));
      }
    })
  }

  fn(resolve, reject);

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
      self.onFulfilledCallbacks.push(error => {
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
  if (x instanceof P) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject);
      }, error => {
        reject(error);
      });
    } else {
      x.then(resolve, reject);
    }
  } else {
    resolve(x);
  }
}

let p = new P((resolve, reject) => {
  resolve("同步任务执行")
});

p.then(value=>{
  console.log(value);
});

