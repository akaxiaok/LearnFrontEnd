var _ = require('./underscore');

function existy(x) {
  return x != null;
}

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

var result = cat([1, 2, 3], [4, 5], [6, 7, 8]);
console.log(result);
result = construct(42, [1, 2, 3]);
console.log(result);

function mapcat(func, coll) {
  return cat.apply(null, _.map(coll, func));
}

result = mapcat(function (e) {
  return construct(e, [',']);
}, [1, 2, 3]);
console.log(result);

function second(array) {
  return _.first(_.rest(array));
}

function constructPair(pair, rests) {
  return [construct(_.first(pair), _.first(rests)), construct(second(pair), second(rests))];
}

result = constructPair(['a', 1], [[], []]);
console.log(result);

function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[], []];
  return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

result = unzip(_.zip([1, 2, 3], [4, 5, 6]));
console.log(result);

function LazyChain(obj) {
  this._calls = [];
  this._target = obj;
}

LazyChain.prototype.invoke = function (methodName) {
  var args = _.rest(arguments);
  this._calls.push(function (target) {
    var meth = target[methodName];
    return meth.apply(target, args);
  });
  return this;
};
LazyChain.prototype.force = function () {
  return _.reduce(this._calls, function (target, thunk) {
    return thunk(target);
  }, this._target);
};

result = new LazyChain([2, 3, 1]).invoke('sort').force();

console.log('lazyChain result', result);

LazyChain.prototype.tap = function (fun) {
  this._calls.push(function (target) {
    fun(target);
    return target;
  });
  return this;
};
var chain = new LazyChain([2, 3, 1]).invoke('sort').tap(console.log);

chain.force();

function pipeline(seed) {
  return _.reduce(_.rest(arguments), function (memo, fun) {
    return fun(memo);
  }, seed);
}

result = pipeline([2, 3, 1], _.max);

console.log('result of pipeline should be 3. Actually is ', result);

function third(array) {
  return pipeline(array, _.rest, _.rest, _.first);
}

result = third([4, 5, 6]);

console.log('third of [4,5,6] is ', result);

function negativeThird(array) {
  return pipeline(array, third, function (n) {
    return -n;
  })
}

result = negativeThird([4, 5, 6]);

console.log('negative third of [4,5,6] is ', result);

function actions(acts, done) {
  return function (seed) {
    var init = { values: [], state: seed };
    var intermediate = _.reduce(acts, function (stateObj, action) {
      var result = action(stateObj.state);
      var values = cat(stateObj.values, [result.answer]);
      return {
        values: values, state: result.state
      }
        ;
    }, init);
    var keep = _.filter(intermediate.values, existy);
    return done(keep, intermediate.state);
  }
}

function lift(answerFunc, stateFunc) {
  return function () {
    var args = _.toArray(arguments);
    return function (state) {
      var ans = answerFunc.apply(null, construct(state, args));
      var s = stateFunc ? stateFunc(state) : ans;
      return { answer: ans, state: s };
    }
  }
}

function sqr(n) {
  return n * n;
}

function neg(n) {
  return -n;
}

function add(n, m) {
  return n + m;
}

var mSqr = lift(sqr);
var mNeg = lift(neg);
var mAdd = lift(add);

var addTwoNegSqrAction = actions([mAdd(2), mSqr(), mNeg()], function (_, state) {
  return state;
});

result = addTwoNegSqrAction(4);

console.log('result of 4 addTwoNegSqrAction is -36', result);





