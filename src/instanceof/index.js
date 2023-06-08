function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj)
  const prototype = constructor.prototype
  while (true) {
    if (proto === null) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}

function Person(name) {
  this.name = name
}

const person = new Person('John')

/**
 * true
 * person.__proto__ => Person.prototype => Object.prototype => null
 */
console.log(myInstanceOf(person, Person))
console.log(myInstanceOf(person, Object)) // true
/**
 * false
 * person.__proto__ => Person.prototype => Object.prototype => null
 */
console.log(myInstanceOf(person, Function)) // false
console.log(myInstanceOf(person, Array)) // false

/**
 * true
 * Person.__proto__ => Function.prototype => Object.prototype => null
 */
console.log(myInstanceOf(Person, Function))
