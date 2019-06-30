function quickSort(array, p, q) {
  if (p < q) {
    var r = partition(array, p, q);
    quickSort(array, p, r - 1);
    quickSort(array, r + 1, q);
  }
}

function partition(array, p, q) {
  for (var i = p; i < q; i++) {
    if (array[i] <= array[q]) {
      swap(array, p, i);
      p++;
    }
  }
  swap(array, p, q);
  return p;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 5, 46, 4, 19, 50, 48];
quickSort(array, 0, array.length - 1);
console.log(array);