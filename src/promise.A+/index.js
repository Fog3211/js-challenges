// https://promisesaplus.com/

function isMyPromise(obj) {
  return obj instanceof MyPromise
}

function runMicroTask(callback) {
  if (globalThis.process && globalThis.process.nextTick) {
    process.nextTick(callback)
  }
  else if (globalThis.MutationObserver) {
    const p = document.createElement('p')
    const observer = new MutationObserver(callback)
    observer.observe(p, {
      childList: true,
    })
    p.innerHTML = '1'
  }
  else {
    setTimeout(callback, 0)
  }
}

class MyPromise {
  state = 'pending'
  value = undefined
  handlers = []

  constructor(executor) {
    this.state = 'pending'
    this.values = undefined
    this.handlers = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    }
    catch (error) {
      this.reject(error)
      console.error(error)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.pushHandler(onFulfilled, 'fulfilled', resolve, reject)
      reject && this.pushHandler(onRejected, 'rejected', resolve, reject)
      this.runHandlers()
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onSettled) {
    return this.then(
      (data) => {
        onSettled()
        return data
      },
      (reason) => {
        onSettled()
        throw reason
      },
    )
  }

  pushHandler(executor, state, resolve, reject) {
    this.handlers.push({
      executor,
      state,
      resolve,
      reject,
    })
  }

  runOneHandler({ executor, state, resolve, reject }) {
    runMicroTask(() => {
      if (this.state === state) {
        if (typeof executor !== 'function') {
          this.state === 'fulfilled' ? resolve(this.value) : reject(this.value)
          return
        }
        try {
          const result = executor(this.value)
          if (isMyPromise(result)) {
            result.then(resolve, reject)
          }
          else {
            resolve(result)
          }
        }
        catch (error) {
          reject(error)
          console.error(error)
        }
      }
    })
  }

  runHandlers() {
    if (this.state !== 'pending') {
      while (this.handlers[0]) {
        const handler = this.handlers[0]
        this.runOneHandler(handler)
        this.handlers.shift()
      }
    }
  }

  changeState(state, data) {
    if (this.state === 'pending') {
      this.state = state
      this.value = data
      this.runHandlers()
    }
  }

  resolve(value) {
    this.changeState('fulfilled', value)
  }

  reject(reason) {
    this.changeState('rejected', reason)
  }
}

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000)
}).then((res) => {
  globalThis.console.log(res)
})
  .then(() => {
    throw new Error('error')
  })
  .catch((err) => {
    globalThis.console.log(err)
  })
  .finally(() => {
    globalThis.console.log('finally')
  })
