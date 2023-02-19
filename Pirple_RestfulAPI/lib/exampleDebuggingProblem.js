/*
* Library that demonstrate something throwing when its init is called
*/

// Container for the module
const example = {};


// Init function
example.init = function(){
  // This is an error created intentionally
  const foo = bar;
};





// Export the module
module.exports = example;
