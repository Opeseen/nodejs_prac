// Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const https = require('https');
const fs = require('fs');
const handlers = require('./handlers');
const helpers = require('./helpers');
const path = require('path');
const util = require('util');
const debug = util.debuglog('server')
// const _data = require('./lib/data');

/*
Testing
//  @TODO-1 delete this
_data.create('test','newFile',{foo:'bar'},function(err){
    console.log('This was the error:',err,);
});

// Testing
// @TODO-2 delete this
helpers.sendTwilioSms('8105853355','Hello From Twilio',function(err){
    console.log('This was the error:',err);
});

*/

// Instantiate the server module object.
const server = {}; 


//  Instatiating the HTTP server
server.httpServer = http.createServer(function(request,response){
   server.unifiedServer(request,response) 
});

// Instantiate the HTTPS server.
server.httpsServerOption = {
    key: fs.readFileSync(path.join(__dirname,'../HTTPS/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'../HTTPS/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOption,function(request,response){
    server.unifiedServer(request,response);
});


// All the Unified Server for both http and https.
server.unifiedServer = function(request,response){
    // Get the Url and Parse it
    const parsedUrl = url.parse(request.url,true);
    // Get the Path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    // Get the query string as Object
    const queryStringObj = parsedUrl.query
    // Get the headers as an object
    const headers = request.headers
    // Get the Http Method
    const method = request.method.toLowerCase();
    //  Get the payload, if any
    const decoder = new stringDecoder('utf-8');
    let buffer ='';
    request.on('data',function(data){
        buffer += decoder.write(data);
    });
    request.on('end',function(){
        buffer += decoder.end();
        // choose the handler the request should go to...
        let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined'? server.router[trimmedPath] : handlers.notFound;
        // If the request is within the public directory - then use the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath':trimmedPath,
            'queryStringObj':queryStringObj,
            'method':method,
            'headers':headers,
            'payload':helpers.parseJsonToObject(buffer)
        };

        try{
            // Route the request to the handler specified in the router
            chosenHandler(data,function(StatusCode,payload,contentType){
                server.processHandlerResponse(response,method,trimmedPath,StatusCode,payload,contentType)
            });
        }catch(err){
            debug(err);
            server.processHandlerResponse(response,method,trimmedPath,500,{Error : 'An unknown error has occured'},'json')
        }
                      
    });
   
};

// Process the response from the handler
server.processHandlerResponse = function(response,method,trimmedPath,StatusCode,payload,contentType){
    // determine the type of response (callback to JSON)
    contentType = typeof(contentType) === 'string' ? contentType : 'json';
    // Use the status code callback by the handler/default...
    StatusCode = typeof(StatusCode) === 'number' ? StatusCode : 200;
    
    // return the response that are content specific
    let payloadString ='';
    if(contentType === 'json'){
        response.setHeader('Content-Type','application/json');
        // Use the payloads call back by the handler/default
        payload = typeof(payload) === 'object' ? payload : {};
        // Convert the payload to a string..
        payloadString = JSON.stringify(payload);
    };
    if(contentType === 'html'){
        response.setHeader('Content-Type','text/html');
        payloadString = typeof(payload) === 'string'? payload : '';
    };

    if(contentType === 'favicon'){
        response.setHeader('Content-Type','image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    };

    if(contentType === 'css'){
        response.setHeader('Content-Type','text/css');
        payloadString = typeof(payload)  !== 'undefined' ? payload : '';
    };

    if(contentType === 'png'){
        response.setHeader('Content-Type','image/png');
        payloadString = typeof(payload)  !== 'undefined' ? payload : '';
    };

    if(contentType === 'jpg'){
        response.setHeader('Content-Type','image/jpeg');
        payloadString = typeof(payload)  !== 'undefined' ? payload : '';
    };

    if(contentType === 'plain'){
        response.setHeader('Content-Type','text/plain');
        payloadString = typeof(payload)  !== 'undefined' ? payload : '';
    };
    
    // return the response-parts that are coming to all content types
    response.writeHead(StatusCode);
    response.end(payloadString);
    // Log the request Path
    // If the response is Green[pring Green]---- Else[print Red]
    if(StatusCode === 200){
        // debug('Returning this response:',StatusCode,payloadString);
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+StatusCode,payloadString);
    }else{
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+StatusCode,payloadString);
    };
};

// Define a request router
server.router = {
    '' : handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.checksList,
    'checks/create': handlers.checksCreate,
    'checks/edit': handlers.checksEdit,
    'ping' : handlers.ping,
    'api/users' : handlers.users,
    'api/tokens' : handlers.tokens,
    'api/checks': handlers.checks,
    'favicon.ico': handlers.favicon,
    'public': handlers.public,
    'examples/error' : handlers.exampleError
}


// Init server
server.init = function(){
    // Starting the HTTP server
    server.httpServer.listen(config.httpPort,function(){
        console.log('\x1b[36m%s\x1b[0m','Server is Now Listen on Port '+config.httpPort+' in '+config.envName+' mode ')
    });
    // Starting the HTTPS server.
    server.httpsServer.listen(config.httpsPort,function(request,response){
        console.log('\x1b[35m%s\x1b[0m','Server is Now Listen on Port '+config.httpsPort+' in '+config.envName+' mode ')
    });

};

module.exports = server;