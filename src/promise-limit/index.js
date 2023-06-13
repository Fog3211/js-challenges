function sleep(ms, result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms)
  })
}

const requests = Array.from({
  length: 20,
}).map((_, u) => sleep(u * 500, u))

const limit = 3 // 最多同时执行的请求数量

function promiseLimit(proms, limit) {
  let count = 0
  const result = []

  const runNext = () => {
    if (proms.length > 0 && count < limit) {
      count++
      const task = proms.shift()

      Promise.resolve(task).then((res) => {
        result.push(res)

        console.log('当前并发数量', count, result)
      }).finally(() => {
        count--
        runNext()
      })
    }
  }

  while (proms.length > 0 && count < limit) {
    runNext()
  }
}

promiseLimit(requests, limit)
