// example 1
let greet: (a: string, b: string) => void;
greet = (name: string, greeting: string) => {
  console.log(`${name} says ${greeting}`);
};

// example 2
let calc: (a: number, b: number, c: string) => number;
calc = (numbOne: number, numTwo: number, action: string) => {
  if (action === "add") {
    return numbOne + numTwo;
  } else {
    return numbOne - numTwo;
  }
};

// example 3
let logDetails: (obj: { name: string; age: number }) => void;

type person = { name: string; age: number };

logDetails = (ninja: person) => {
  console.log(`${ninja.name} is ${ninja.age} years old`);
};
