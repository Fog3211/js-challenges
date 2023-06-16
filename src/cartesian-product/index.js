/**

假设当前有三个不等长数组A，B，C。三个数组分别包含如下元素

A：[a1, a2, a3]

B：[b1, b2]

C：[c1, c2, c3]

从每个数组中选择一项，组成数列，可以获得如下数列：a1b1c1，a1b1c2，a1b1c3，a2b1c1，a2b1c2……

全部的组合即为笛卡尔积。

*/

function cartesianProduct(array) {
  if (array.length === 0) {
    return [[]]
  }

  const [first, ...rest] = array
  const restCartesianProduct = cartesianProduct(rest)
  return restCartesianProduct.flatMap(item => first.map(fItem => [fItem, ...item]))
}

console.log(
  cartesianProduct([
    ['a1', 'a2', 'a3'],
    ['b1', 'b2'],
    ['c1', 'c2', 'c3'],
  ]),
)
