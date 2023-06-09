function debounce(fn, ms) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout()
    }
    else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }
}
