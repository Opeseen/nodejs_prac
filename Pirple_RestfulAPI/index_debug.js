// Dependencies

const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const exampleDebuggingProblem = require('./lib/exampleDebuggingProblem');


// Declare the app.
const app = {};

// Init Function
app.init = function(){

    // Start the server
    debugger;
    server.init();
    debugger;

    // Start the workers
    debugger;
    workers.init();
    debugger;

    // Start the CLI, but make sure it start last.
    debugger
    setTimeout(()=>{
        cli.init();
        debugger;
    },50);
    debugger;
    // Set the foo at 1
    let foo = 1
    console.log('Just assigned 1 to foo');
    debugger;
    // Incrementing foo
    foo++;
    console.log('Just incremented foo');
    debugger;

    // Square foo
    debugger;
    foo = foo * foo;
    console.log('Just squared foo');
    // Convert foo to a string
    debugger;
    foo = foo.toString();
    console.log('Just converted foo to string');
    debugger;
    // Call the init script that will throw
    exampleDebuggingProblem.init();
    console.log('Just called the library');
    debugger;
};

// Execute
debugger;
app.init();
debugger;
// Export the app
module.exports = app;
