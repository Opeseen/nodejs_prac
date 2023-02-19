// Test runner

// Dependencies
const helpers = require('./../lib/helpers');
const assert = require('assert');

// Application logic for the test runner
_app = {}

// Container for the tests
_app.tests = {
  'unit': {}
};

// ASert that the get a number function is returning a number
_app.tests.unit['helpers.getAnumber should return a number'] = function(done){
  const value = helpers.getAnumber();
  assert.equal(typeof(value),'number')
  done()
};

// ASert that the get a number function is returning a 1
_app.tests.unit['helpers.getAnumber should return 1'] = function(done){
  const value = helpers.getAnumber();
  assert.equal(value,1)
  done()
};

// ASert that the get a number function is returning a 2
_app.tests.unit['helpers.getAnumber should return 2'] = function(done){
  const value = helpers.getAnumber();
  assert.equal(value,2)
  done()
};

// Count all the tests
_app.countTests = () => {
  let counter = 0;
  for(const key in _app.tests){
    if(_app.tests.hasOwnProperty(key)){
      const subTests = _app.tests[key];
      for(const testName in subTests){
        if(subTests.hasOwnProperty(testName)){
          counter++;
        }
      }
    }
  }

  return counter;

};

// Run all the test collecting the errors and successes
_app.runTests = function(){
  const errors = [];
  let successes = 0;
  const limit = _app.countTests();
  let counter = 0;
  for(const key in _app.tests){
    if(_app.tests.hasOwnProperty(key)){
      const subTests = _app.tests[key]
      for(const testName in subTests){
        if(subTests.hasOwnProperty(testName)){
          (function(){
            const tempTestName = testName;
            const testValue = subTests[testName];
            // Call the test
            try {
              testValue(function(){
                // if it calls back without throwing, then it succeeded,so log it in green
                console.log('\x1b[32m%s\x1b[0m', tempTestName)
                counter++;
                successes++;
                if(counter === limit){
                  _app.produceTestReport(limit,successes,errors);
                }
              });
            } catch (err) {
              // If it throws, then it failed, so capture the error thrown and log it in red
              errors.push({
                Name: testName,
                error: err
              });
              console.log('\x1b[31m%s\x1b[0m', tempTestName)
              counter++;
              if(counter === limit){
                _app.produceTestReport(limit,successes,errors);
              }
            }
          })();
        }
      }
    }
  }
};

// Produce a test outcome report
_app.produceTestReport = (limit,successes,errors) => {
  console.log("");
  console.log("-------------------BIGIN TEST REPORT--------------------");
  console.log("");
  console.log("Total Tests:",limit);
  console.log("Pass:",successes);
  console.log("Fail:",errors.length);
  console.log("");

  // If there are errors, print them in details
  if(errors.length > 0){
    console.log("----------------BEGIN ERROR DETAILS-------------------");
    console.log("");

    errors.forEach(testError => {
      console.log('\x1b[31m%s\x1b[0m', testError.Name);
      console.log(testError.error);
      console.log();
    });

    console.log("-----------------END ERROR DETAILS---------------------");
  }

  console.log("");
  console.log("------------------END TEST REPORT-------------------------");
}


// Run the tests
_app.runTests();