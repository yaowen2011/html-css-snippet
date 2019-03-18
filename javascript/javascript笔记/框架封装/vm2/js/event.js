const Event = {
  events: {},
  
  on (eventName, cb) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(db)
  },

  off (eventName, cb) {
    this.events[eventName] = this.events[eventName].filter(f => f !== cb)
  },

  emit (eventName, ...data) {
    this.events[eventName] && this.events[eventName].forEach(db => db(...data))
  }
}