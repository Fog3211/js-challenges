function strCompress(str) {
  if (!str || str.length <= 1) {
    return str
  }

  let cur = str[0]
  let count = 0
  let res = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === cur) {
      count++
    }
    else {
      res += `${cur}${count}`
      cur = str[i]
      count = 1
    }
  }
  res += `${cur}${count}`
  return res
}

// abbccccaaa->a1b2c4a3
console.log(
  strCompress('abbccccaaa'),
)
