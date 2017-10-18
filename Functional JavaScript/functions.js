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
