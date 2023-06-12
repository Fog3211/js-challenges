const promise = new Promise((resolve) => {
  console.log(1)
  resolve()
})

setTimeout(() => {
  console.log(2)
})

promise.then(() => {
  requestAnimationFrame(() => {
    console.log(3)
    requestAnimationFrame(() => {
      console.log(4)
    })
  })
  new Promise((resolve) => {
    console.log(10)
    resolve()
  }).then(() => {
    console.log(9)
  })
  console.log(5)
})

const promise2 = getPromise()

async function getPromise() {
  console.log(6)
  await promise
  console.log(7)
}

console.log(8)

// 1 6 8 10 5 7 9 2 3 4
