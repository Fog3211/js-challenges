Promise.myAll = function (_promises) {
  if (
    !(
      typeof _promises === 'object'
        && _promises !== null
        && typeof _promises[Symbol.iterator] === 'function'
    )
  ) {
    throw new TypeError(`${_promises} is not iterable`)
  }
  return new Promise((resolve, reject) => {
    try {
      const promises = Array.from(_promises)
      const result = []
      let fulfilledCount = 0
      if (promises.length === 0) {
        resolve(result)
      }
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((res) => {
          result[i] = res
          if (++fulfilledCount === promises.length - 1) {
            resolve(result)
          }
        }, reject)
      }
    }
    catch (err) {
      reject(err)
    }
  })
}

// 验证:
function test() {
  try {
    Promise.myAll(null).then(
      res => console.log(res),
      rej => console.log(rej),
    )
    // throw err: null is not iterable
  }
  catch (e) {
    console.log(e)
  }

  try {
    Promise.myAll({}).then(
      res => console.log(res),
      rej => console.log(rej),
    )
    // throw err: [object object] is not iterable
  }
  catch (e) {
    console.log(e)
  }

  Promise.myAll([]).then(
    res => console.log(res),
    rej => console.log(rej),
  )
  // []

  Promise.myAll(new Set()).then(
    res => console.log(res),
    rej => console.log(rej),
  )
  // []

  Promise.myAll(new Map()).then(
    res => console.log(res),
    rej => console.log(rej),
  )
  // []

  Promise.myAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
    4,
  ]).then(
    res => console.log(res),
    rej => console.log(rej),
  )

  // [1, 2, 3, 4]

  Promise.myAll([
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject(1),
    Promise.resolve(2),
    Promise.resolve(3),
    4,
  ]).then(
    res => console.log(res),
    rej => console.log(rej),
  )
  // 1
}
test()
