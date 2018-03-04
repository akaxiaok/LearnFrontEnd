function sum() {
  if (arguments.length > 1) {
    return arguments[0] + sum.apply(null, [].slice.call(arguments, 1, arguments.length));
  } else if (arguments.length === 1) {
    return arguments[0];
  } else {
    return 0;
  }
}

console.assert(sum(1) === 1);
console.assert(sum(1, 2) === 3);
console.assert(sum(1, 2, 3) === 6);
console.assert(sum() === 0);

function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

console.assert(isPalindrome('aassaa'));
console.assert(!isPalindrome('aaassaa'));

function elementTraverse(element,callbacks) {
  callbacks(element);
  if(element.children){
    for (var i = 0; i < element.children.length; i++) {
      elementTraverse(element.children[i],callbacks)
    }
  }
}