Array.prototype.bubbleSort = function () {
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        var temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
  return this;
};
var array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],
  arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr.sort((a, b) => {
  return a - b;
});
console.assert(array.bubbleSort().toString() === arr.toString());


function quickSort(arr, left, right) {
  var length = arr.length,
    index,
    left = typeof left !== 'number' ? 0 : left,
    right = typeof right !== 'number' ? length - 1 : right
  if (left < right) {
    index = partition(arr, left, right);
    quickSort(arr, left, index - 1);
    quickSort(arr, index + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  var pivot = left,
    index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


// one line quick sort
function quickSortOne(a) {
  return a.length <= 1 ? a : quickSort(a.slice(1).filter(item => item <= a[0])).concat(a[0], quickSort(a.slice(1).filter(item => item > a[0])));
}

array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr.sort((a, b) => {
  return a - b;
});
console.assert(quickSort(array).toString() === arr.toString());


array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr.sort((a, b) => {
  return a - b;
});
console.assert(quickSortOne(array).toString() === arr.toString());

function quickSortMemory(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var index = 0;
  var pivot = arr.splice(index, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSortMemory(left).concat([pivot], quickSortMemory(right));


}

array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
arr.sort((a, b) => {
  return a - b;
});
console.assert(quickSortMemory(array).toString() === arr.toString());