var array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 5, 46, 4, 19, 50, 48];

function insertSort(array) {
  for (var i = 1; i < array.length; i++) {
    var temp = array[i];
    for (var j = i - 1; i > 0 && array[j] > temp; j--) {
      swap(array, j, j + 1);
    }
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

insertSort(array);
console.log(array);