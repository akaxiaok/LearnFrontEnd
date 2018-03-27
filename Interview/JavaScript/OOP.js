function define(fun) {
  fun();
}

function SuperType(age) {
  this.age = age;
  this.sayHello = function () {
    return 'hello';
  }
}

SuperType.prototype.sayHi = function () {
  return 'hi';
};

define(function () {

  function SubType(name, age) {
    this.name = name;
    this.age = age;
  }

  SubType.prototype = new SuperType();

  var k = new SubType('K', 18);
  console.assert(k.sayHello() === 'hello');
  console.assert(k.sayHi() === 'hi');
  console.assert(k instanceof SuperType === true, 'instanceof should work');
});
define(function () {

  function SubType(name, age) {
    SuperType.call(this, age);
    this.name = name;
  }

  var k = new SubType('K', 18);
  console.assert(k.age === 18);
  console.assert(k.sayHello() === 'hello');
  console.assert(k.sayHi === undefined);
  console.assert(k instanceof SuperType === false, 'instanceof should not work');
});
define(function () {

  function SubType(name, age) {
    SuperType.call(this, age);
    this.name = name;
  }

  SubType.prototype = new SuperType();

  var k = new SubType('K', 18);
  console.assert(k.age === 18);
  console.assert(k.sayHello() === 'hello');
  console.assert(k.sayHi() === 'hi');
  console.assert(k instanceof SuperType, 'instanceof should work');
});

function create(o) {
  function F() {
  }

  F.prototype = o;
  return new F();
}

define(function () {
  function createObject(obj) {
    var clone = create(obj);
    clone.sayHi = function () {
      return 'hi';
    };
    return clone;
  }
});
define(function () {
  function inheritPrototype(subType, superType) {
    var prototype = create(superType.prototype);
    subType.prototype = prototype;
    subType.prototype.constructor = subType;
  }

  function SubType(name, age) {
    SuperType.call(this, age);
    this.name = name;
  }

  inheritPrototype(SubType, SuperType);
  var k = new SubType('k', 18);
  console.assert(k.sayHi() === 'hi');
  console.assert(k.sayHello() === 'hello');
  console.assert(k instanceof SuperType, 'instanceof should work');
});