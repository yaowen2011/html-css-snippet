## watch的场景
``````javascript
// <input v-model="keyword" placeholder="输入关键字">
function throttle(fn, context, pram=[], delay=500, mustApplyTime=1000) {
  fn.timer && clearTimeout(fn.timer)
  fn._cur = Date.now()
  fn._start = fn._start || fn._cur
  if (fn._cur - fn._start > mustApplyTime) {
    fn.apply(context, param)
    fn._start = fn._cur // 种植任务的开始时间
  } else {
    fn.timer = setTimeout(function() {
      fn.apply(context, param)
    }, delay)
  }
}
export default {
  watch: {
    keyword(cur) {
      throttle()
    }
  },
  methods: {
    onInputSearch(keyword) {
      // do async task
    }
  }
}
``````