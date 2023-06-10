function myCreate1(proto) {
  const Fn = function () { }
  Fn.prototype = proto
  return new Fn()
}

function myCreate2(proto) {
  const obj = {}
  obj.__proto__ = proto
  return obj
}
