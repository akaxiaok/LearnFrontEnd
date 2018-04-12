var array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 5, 46, 4, 19, 50, 48];

function mergeSort(array, p, q) {
  var r = Math.floor((p + q) / 2);
  if (p >= q) return;
  mergeSort(array, p, r);
  mergeSort(array, r + 1, q);
  merge(array, p, r, q);
}


function merge(array, p, r, q) {
  var left = array.slice(p, r + 1);
  var right = array.slice(r + 1, q + 1);
  for (var i = p; i < q + 1; i++) {
    if (left[0] && (left[0] <= right[0] || !right[0])) {
      array[i] = left.shift();
    } else if (right[0]) {
      array[i] = right.shift();
    }
  }
}

mergeSort(array, 0, array.length);
console.log(array);