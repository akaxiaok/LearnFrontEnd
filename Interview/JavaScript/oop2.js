function Foo(x, y) {
  this.x = x;
  this.y = y;
}

Foo.prototype.log = function () {
  console.log(this.x, this.y);
};

function Bar(x, y) {
  Foo.call(this, x, y);
}
Bar.prototype = new Foo();
Bar.prototype.constructor = Bar;
const t1 = new Bar(1,2);

t1.log();

console.log(t1.constructor);

