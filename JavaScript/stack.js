function Stack() {
  this.stack = [];
  for (var i = 0; i < arguments.length; i++) {
    this.stack.push(arguments[i]);
  }
  this.push = function (element) {
    this.stack.push(element);
    return this;
  };
  this.pop = function () {
    return this.stack.pop();
  };
  this.length = function () {
    return this.stack.length;
  };
  this.first = function () {
    return this.stack[0];
  };
  this.last = function () {
    return this.stack[this.stack.length - 1];
  };
  this.clear = function () {
    this.stack.length = 0;
  }
}

var stack = new Stack('K', 'Lily', 'LYC');
console.assert(stack.length(), 'length is 3');
stack.push('Wang');
console.assert(stack.last() === 'Wang', 'last is wang');
console.assert(stack.pop() === 'Wang', 'Wang poped');
stack.clear();
console.assert(stack.length() === 0, 'length is 0');