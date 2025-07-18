// explicit types
let character: string;
let age: number;
let isLoggedIn: boolean;

age = 30;
isLoggedIn = true;

let ninjas: string[] = []; // we should initialize before pushing items to arrays
ninjas.push("shaun");

// union types
let mixed: (string | number)[] = []; // can contains array of string or number only
mixed.push("hello");
mixed.push(20);
// mixed.push(false) will not work because boolean is not part of the specified types

let uid: string | number;
uid = "123";
uid = 123;

// objects
let ninjaOne: object;
ninjaOne = { name: "yoshi", age: 30 };
// ninjaOne = 'hello' // wont work
ninjaOne = []; // will work because array is also an object

let ninjaTwo: {
  name: string;
  age: number;
  beltColor: string;
};

ninjaTwo = {
  name: "mario",
  age: 20,
  beltColor: "black",
  // color: true // this wont work because it's not part of the object types declared.
};
