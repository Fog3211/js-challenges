declare global {
  interface Promise<T> {
    myCatch(onCatch: (err: any) => any): Promise<T>
  }
}

export function initPromiseFinally() {
  // eslint-disable-next-line no-extend-native
  Promise.prototype.myCatch = function (onCatch: (err: any) => any) {
    return this.then(
      null,
      onCatch,
    )
  }
}

initPromiseFinally()

// Promise.resolve(123)
//   .then((res) => {
//     console.log(res) // 123
//     return Promise.reject(456)
//   })
//   .myCatch(() => {
//     console.log('onCatch')
//   })
//   .then(() => {
//     console.log('then')
//   })
//   .myCatch(() => {
//     console.log('不会触发')
//   })
