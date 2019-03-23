window.addEventListener('resize', (function(e) {
  var timer
  return function() {
    // clear the task already in the async queue
    if(timer) clearTimeout(timer)
    timer = setTimeout(function() {
      // specific actions
      // will not execute immediately
    }, 500)
  }
})())

// 使用倒逼法，似乎真的会很有用
// 注重质量多余数量，多分析这种经典案例
// that's is the very secene where closure used,
// especially used in event listener
// closure is very useful when deal with some time relevant scene
let throttle = (fn, delay) => {
  // the structure of this algorithm
  // first: 
  //     difine some private variable 
  //     that will keep track the value 
  let timer
  let context, args, startTime = Date.now()
  let run = () => {
    timer = setTimeout(() => {
      fn.apply(context, args);
      clearTimeout(timer)
      timer = null
    }, delay)
  }

  return function() {
    context = this    // track this 
    args = arguments  // track arguments
    let currTime = Date.now()
    if (currTime - startTime >= delay) {
      // reset the startTime
      startTime = Date.now()
      // set the plan into queue
      run()
    } else {
      // throttle 忽略
    }
  }
}