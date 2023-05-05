const data = [
  {
    name: '数据1',
    parent: null,
    id: 1,
  },
  {
    name: '数据2',
    id: 2,
    parent: 1,
  },
  {
    name: '数据3',
    parent: 2,
    id: 3,
  },
  {
    name: '数据4',
    parent: 3,
    id: 4,
  },
  {
    name: '数据5',
    parent: 3,
    id: 5,
  },
]

function treeToList(arr, parentId = null) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.parent === parentId) {
      const children = treeToList(arr, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  }
  return result
}

console.dir(data, { depth: null })
