// arrays
let names = ['luigi', 'mario', 'yoshi']
// names.push(3) // not possible

let numbers = [10, 20, 30, 40]
// numbers.push("John" // not possible)

let mixed = ['ken', 4, 'chun-li', 8, 9]
mixed.push('ryu') // possible
mixed.push(10) // possible

// objects
let ninja = {
  name: 'mario',
  belt: 'black',
  age: 30
}

ninja.age = 40;
ninja.name = 'ryu';
// ninja.age = '30' // not possible
// ninja.skills = ['fighting', 'sneaking'] // not possible

ninja = {
  name: 'yoshi',
  belt: 'orange',
  age: 50,
  // skills: [] // not possible
}