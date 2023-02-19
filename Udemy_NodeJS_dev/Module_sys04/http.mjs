/*
const http = require('http');

const req = http.request('http://www.google.com',(response) => {
    response.on('data',(data) => {
        console.log(data)
    });
    response.on('end', () => {
        const status = response.statusCode
        console.log('No More Data',status)
    });
    
});

req.end()
*/
// const request = require('./request');
import {send} from './request.mjs';
import {read} from './response.mjs';
// const response = require('./response');

function makeRequest(url,data){
    send(url,data);
    return read();
};

const responseData = makeRequest('http://google.com', 'hello')
console.log(responseData);