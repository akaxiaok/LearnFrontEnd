var array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 5, 46, 4, 19, 50, 48];

function selectSort(array) {
  for (var i = 0; i < array.length; i++) {
    var minIndex = i;
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    swap(array, i, minIndex);
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

selectSort(array);
console.log(array);