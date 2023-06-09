/**
 *
 *

LazyMan('Tony'); 输出
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch'); 输出
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner'); 输出
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food'); 输出
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

*/

class LazyManClass {
  constructor(name) {
    this.name = name
    this.taskList = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  eat(food) {
    const that = this
    // const fn = (function (food) {
    //   return function () {
    //     console.log(`eat ${food}`)
    //     that.next()
    //   }
    // })(food)
    // this.taskList.unshift(fn)
    this.taskList.push(() => {
      console.log(`eat ${food}`)
      that.next()
    })
    return this
  }

  sleepFirst(time) {
    const that = this
    // const fn = (function (time) {
    //   return function () {
    //     setTimeout(() => {
    //       console.log(`sleep time before ${time} s`)
    //       that.next()
    //     }, time * 1000)
    //   }
    // })(time)
    // this.taskList.unshift(fn)
    this.taskList.unshift(() => {
      setTimeout(() => {
        console.log(`sleep time before ${time} s`)
        that.next()
      }, time * 1000)
    })
    return this
  }

  sleep(time) {
    const that = this
    // const fn = (function (time) {
    //   return function () {
    //     setTimeout(() => {
    //       console.log(`sleep ${time} s`)
    //       that.next()
    //     }, time * 1000)
    //   }
    // })(time)
    // this.taskList.push(fn)
    this.taskList.push(() => {
      setTimeout(() => {
        console.log(`sleep time before ${time} s`)
        that.next()
      }, time * 1000)
    })
    return this
  }

  next() {
    const fun = this.taskList.shift()
    fun && fun()
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}

// LazyMan('Tony').eat('dinner').sleep(5).sleepFirst(3).eat('supper')

LazyMan('Tom').eat('lunch').eat('dinner').sleepFirst(1).sleep(2).eat('junk food')
