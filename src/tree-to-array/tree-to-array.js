const tree = [
  {
    id: 1,
    text: '节点1',
    children: [
      {
        id: 2,
        text: '节点1_2',
      },
      {
        id: 3,
        text: '节点1_3',
        children: [
          {
            id: 4,
            text: '节点3-4',
          },
        ],
      },
    ],
  },
]

function treeToList(tree) {
  const result = []

  function dfs(root, parentId = 0) {
    for (let i = 0; i < root.length; i++) {
      const data = {
        ...root[i],
        parentId,
      }
      const children = data.children
      delete data.children
      result.push(data)
      if (root[i].children) {
        dfs(children, root[i].id)
      }
    }
  }
  dfs(tree)

  return result
}

console.log(
  treeToList(tree),
)
