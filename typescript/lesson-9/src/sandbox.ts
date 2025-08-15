type StringOrNum = String | number;
type objWithName = { name: string; uid: StringOrNum };

const logDetails = (uid: StringOrNum | number, item: string) => {
  console.log(`${item} has a uid of ${uid}`);
};

const greet = (user: objWithName) => {
  console.log(`${user.name} says hello`);
};

const greetAgain = (user: objWithName) => {
  console.log(`${user.name} says hello`);
};
