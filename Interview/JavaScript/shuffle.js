function shuffle(arr) {
  var shuffled = new Array(arr.length);
  for (var i = 0; i < arr.length; i++) {
    var random = Math.floor(Math.random() * (i + 1));
    shuffled[i] = shuffled[random];
    shuffled[random] = arr[i];
  }
  return shuffled;
}

function shuffle2(arr) {
  for (var i = 0; i < arr.length; i++) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}

var target = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(shuffle(target).toString());
console.log(shuffle(target).sort((i, j) => {
  return i - j;
}).toString());

console.log(shuffle2(target).toString());
console.log(shuffle2(target).sort((i, j) => {
  return i - j;
}).toString());