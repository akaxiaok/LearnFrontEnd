function Queue() {
  this.queue = [];
  for (var i = 0; i < arguments.length; i++) {
    this.queue.push(arguments[i]);
  }
  this.enqueue = function (element) {
    this.queue.push(element);
    return this;
  };
  this.dequeue = function () {
    return this.queue.shift();
  };
  this.length = function () {
    return this.queue.length;
  };
  this.first = function () {
    return this.queue[0];
  };
  this.last = function () {
    return this.queue[this.queue.length - 1];
  };
  this.clear = function () {
    this.queue.length = 0;
  }
}

var studentQueue = new Queue('K', 'Lily', 'LYC');
console.assert(studentQueue.length(), 'length is 3');
studentQueue.enqueue('Wang');
console.assert(studentQueue.last() === 'Wang', 'last is wang');
studentQueue.dequeue();
console.assert(studentQueue.first() === 'Lily', 'first is Lily');
studentQueue.clear();
console.assert(studentQueue.length() === 0, 'length is 0');