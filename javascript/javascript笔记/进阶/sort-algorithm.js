// bubble sort
function bubbleSort(arr) {
  for(var i = 0; i<arr.length; ++i) {
    // compare siblings value ,in each loop will finally set a value
    // every time after a singal loop will confirm a value
    for(var j= 0; j <= arr.length - i; ++j) {
      if (arr[j] < arr[j+1]) {
        var t = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = t
      }
    }
  }
  return arr
}
bubbleSort([3,4,1,2,6])

// quick sort
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let left=[], right=[]
  let pivot = arr[0]
  arr.forEach(a => {
    if (a < pivot) {
      left.push(a)
    } else if (a > pivot) {
      right.push(a)
    }
  })
  return [...quickSort(left), pivot, ...quickSort(right)]
}
quickSort([200,150, 100, 200])

// sort algorithm
// binary search
// the arr in arguments should be a sorted one
function binSearch(arr, startIndex, endIndex, target) {
  if (startIndex > endIndex) return -1;
  // essential of binary search is to narrow the index we want to tackle down
  let pivot = Math.floor((startIndex + endIndex)/2)
  if (target === arr[pivot] ) {
    return pivot
  } 
  if (target < arr[pivot]) {
    endIndex = pivot - 1;
  } else {
    startIndex = pivot + 1;
  }
  return binSearch(arr, startIndex, endIndex, target)
}
var arr = [1,2,3,4,5,6,7]
binSearch(arr, 0, arr.length - 1, 3)