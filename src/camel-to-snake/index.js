// 有一串json, key的命名是小驼峰, 要求转成下划线
// 例1:
// {
//   assBss: {
//     cssDss: 1
//   }
// }
// //  ===>
// {
//   ass_bss: {
//     css_dss: 1
//   }
// }

// 例2:
// {
//   bookList: [{
//     bookName: 'XXX1',
//     bookAuthorId: 1,
//   }, {
//     bookName: 'XXX2',
//     boodId: 2,
//     bookAuthorId: 1,
//   }],
// }
// // =====>
// {
//   book_list: [{
//     book_name: 'XXX1',
//     book_author_id: 1,
//   }, {
//     book_name: 'XXX2',
//     book_author_id: 1,
//   }]
// }

function transformKey(str) {
  return str.replace(/[A-Z]+/g, ($1) => {
    return `_${$1.toLowerCase()}`
  })
}

function camelToSnake(obj) {
  for (const key in obj) {
    const value = obj[key]
    obj[transformKey(key)] = obj[key]
    delete obj[key]

    if (Array.isArray(value)) {
      value.forEach(camelToSnake)
    }
    else {
      if (typeof value === 'object' && value !== null) {
        camelToSnake(value)
      }
    }
  }

  return obj
}

console.dir(
  camelToSnake(
    {
      assBss: {
        cssDss: 1,
      },
    },
  ),
)

console.dir(
  camelToSnake(
    {
      bookList: [{
        bookName: 'XXX1',
        bookAuthorId: 1,
      }, {
        bookName: 'XXX2',
        boodId: 2,
        bookAuthorId: 1,
      }],
    },
  ),
)
