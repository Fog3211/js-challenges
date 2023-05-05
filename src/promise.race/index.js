Promise.MyRace = function (proms) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < proms.length; i++) {
      Promise.resolve(proms[i]).then(resolve, reject)
    }
  })
}

function sleep(ms, result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms)
  })
}

console.log(
  Promise.MyRace([
    sleep(1000, 'a'),
    sleep(3000, 'bbb'),
  ]).then((res) => {
    console.log('race', res)
  }),
)
