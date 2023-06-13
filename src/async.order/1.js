const p = new Promise((resolve, reject) => {
  console.log(0)
  reject()
  console.log(1)
  resolve()
  console.log(2)
})
p.then((res) => {
  console.log(3)
}).then((res) => {
  console.log(4)
}).catch((res) => {
  console.log(5)
}).then((res) => {
  console.log(6)
}).catch((res) => {
  console.log(7)
}).then((res) => {
  console.log(8)
})

// 0 1 2 5 6 8
