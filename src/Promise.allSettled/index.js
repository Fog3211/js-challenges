Promise.allSettled = function (proms) {
  const result = []
  for (let i = 0; i < proms.length; i++) {
    result.push(
      Promise.resolve(proms[i]).then(
        value => ({
          status: 'fulfilled',
          value,
        }),
        reason => ({
          status: 'rejected',
          reason,
        }),
      ),
    )
  }

  return Promise.all(result)
}

const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 1000, 'foo'),
)
const promises = [promise2, promise1]
console.log('start')
Promise.allSettled(promises).then(results =>
  results.forEach(result => console.log(result)),
)
