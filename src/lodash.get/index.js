function lodashGet(obj, path, defaultValue = undefined) {
  let newPath = []
  if (Array.isArray(path)) {
    newPath = path
  }
  else {
    newPath = path.replace(/\[/ig, '.').replace(/\]/ig, '').split('.')
  }

  if (!obj || typeof obj !== 'object') {
    return defaultValue
  }
  else {
    return newPath.reduce((prev, curr) => {
      return (prev || {})[curr]
    }, obj) ?? defaultValue
  }
}

const object = { a: [{ b: { c: 3, d: 0 } }] }

console.log(lodashGet(object, 'a[0].b.c'))
// => 3

console.log(lodashGet(object, ['a', '0', 'b', 'd']))
// => 0

console.log(lodashGet(object, 'a.b.c', 'default'))
// => 'default'
