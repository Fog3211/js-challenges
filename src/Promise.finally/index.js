function initPromiseFinally() {
  Promise.prototype.myFinally = function (onfinally) {
    return this.then(
      (value) => {
        onfinally()
        return value
      },
      (reason) => {
        onfinally()
        throw reason
      },
    )
  }
}

initPromiseFinally()

Promise.resolve(123)
  .then((res) => {
    console.log(res) // 123
    return Promise.reject(456)
  })
  .myFinally(() => {
    console.log('finally1')
    return 'finally本身不返回值'
  })
  .then(
    () => {},
    (err) => {
      console.log(err) // 123
      return 789
    },
  )
  .myFinally(() => console.log('finally2'))
  .then(res => console.log(res)) // 789
