const obj = {
  data: ['aaa', 'bbb', 'ccc'],
  // [Symbol.iterator]() {
  //   const that = this
  //   let index = 0

  //   return {
  //     next() {
  //       if (index < that.data.length) {
  //         return {
  //           value: that.data[index++],
  //           done: false,
  //         }
  //       }
  //       else {
  //         return {
  //           value: undefined,
  //           done: true,
  //         }
  //       }
  //     },
  //   }
  // },

  *[Symbol.iterator]() {
    for (let i = 0; i < this.data.length; i++) {
      yield this.data[i]
    }
  },
}

for (const key of obj) {
  console.log(key)
}
