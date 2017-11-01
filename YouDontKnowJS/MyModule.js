var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    var myDeps = [];
    for (var i = 0; i < deps.length; i++) {
      myDeps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, myDeps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  }
})();

MyModules.define('bar', [], function () {
  function hello(who) {
    return 'Let me introduce: ' + who;
  }

  return {
    hello: hello
  }
});

MyModules.define('foo', ['bar'], function (bar) {
  var hungry = 'hippo';

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  }
});

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(bar.hello('hippo'));
foo.awesome();
