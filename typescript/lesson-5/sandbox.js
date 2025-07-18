// explicit types
var character;
var age;
var isLoggedIn;
age = 30;
isLoggedIn = true;
var ninjas = []; // we should initialize before pushing items to arrays
ninjas.push("shaun");
// union types
var mixed = []; // can contains array of string or number only
mixed.push("hello");
mixed.push(20);
// mixed.push(false) will not work because boolean is not part of the specified types
var uid;
uid = "123";
uid = 123;
// objects
var ninjaOne;
ninjaOne = { name: "yoshi", age: 30 };
// ninjaOne = 'hello' // wont work
ninjaOne = []; // will work because array is also an object
var ninjaTwo;
ninjaTwo = {
    name: "mario",
    age: 20,
    beltColor: "black",
    // color: true // this wont work because it's not part of the object types declared.
};
