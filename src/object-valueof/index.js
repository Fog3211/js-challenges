const a = {
  value: 1,
  valueOf() {
    return this.value++
  },
}

// const a = new Proxy({}, {
//   i: 1,
//   get: function() {
//     return () => this.i++;
//   }
// });

if (a == 1 && a == 2 && a == 3) {
  console.log(1) // 输出：1
}
else {
  console.log(2)
}
