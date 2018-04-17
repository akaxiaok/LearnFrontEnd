function countingSort(array, n) {
  n = n + 1;
  var equalArray = [];
  for (var i = 0; i < n; i++) {
    equalArray[i] = 0;
  }
  for (var i = 0; i < n; i++) {
    equalArray[array[i]] += 1;
  }
  var next = [0];
  for (var i = 1; i < n; i++) {
    next.push(equalArray[i - 1] + next[i - 1]);
  }
  var sorted = [];
  for (var i = 0; i < array.length; i++) {
    var temp = array[i];
    var index = next[temp];
    sorted[index] = temp;
    next[temp] += 1;
  }l
  array.forEach(function (v, i) {
    array[i] = sorted[i];
  })
}

var array = [3, 0, 44, 38, 5, 47, 15, 36, 26, 27, 0, 5, 46, 4, 19, 50, 48];
countingSort(array, 50);
console.log(array);