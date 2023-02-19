//  Mosh...Http Module

/*
const http = require('http');
const { StringDecoder } = require('string_decoder');

const { json } = require('stream/consumers');

const server = http.createServer((request,response)=>{
    if(request.url === '/'){
        response.write('Hello World');
        response.end();
    }
    if(request.url ==='/api/courses'){
        response.write(JSON.stringify([1,2,3]));
        response.end()
    }
});
server.listen(3000, function(){
    console.log('Listen on port 3000')
});

*/

// Smartherd... Http Module..
// const url = require('url');

/*
const server = http.createServer((request,respond)=>{
    respond.setHeader('Location','www.Opeyemidevops.online/index')
    respond.setHeader('foo','bar')
    respond.writeHead(200,{'Content-Type':'text/html','X':'Y'})
    
    const passUrl = url.parse(request.url,true)
    const query = passUrl.query
    const mssg = query.name + ' Is ' + query.age + ' years old '
    respond.write(mssg)
    respond.end()
})

server.listen(3000,()=>{
    console.log('Server is listen running...')
})


// Steve Griffith Http Module ....
/*
const server = http.createServer((request,respond)=>{
    respond.setHeader('Content-type','application/json');
    respond.setHeader('Access-Control-Allow-Origin','*');
    respond.writeHead(200); // StatusCode Http Is OK!
    
    if(request.url ==='/api/courses'){
        respond.write(JSON.stringify([1,2,3]));
        respond.end()
    }else{
        let dataObj = {id:123,name:'Bob',email:'Bob@yahoo.com'};
        let data = JSON.stringify(dataObj)
        respond.end(data)
    }

})

server.listen(3000,function(){
    console.log('Server Is Now Listening')
})


const stringDecode = require('string_decoder').StringDecoder
const util = require('util');
// const formidable = require('formidable')
const server = http.createServer((request,respond)=>{
    const path = url.parse(request.url,true)
    // console.log(http.STATUS_CODES)
    // console.log(request.headers)
    // console.log(request.url)
    const decoder = new StringDecoder('utf8');
    let buffer ='';
    request.on('data', (chunk)=>{
        buffer += decoder.write(chunk)
    })
    request.on('end',()=>{
        buffer += decoder.end();
        respond.writeHead(200,'OK',{'Context-type':'text/plain'});
        respond.write('The Response!!\n');
        respond.write(util.inspect(path.pathname)+'\n')
        respond.write(util.inspect(path.query)+'\n')
        respond.write(buffer + '\n')
        respond.end('End of Message to the Browser!!')
    })
    
})

server.listen(5000,function(){
    console.log('Server is Listening on Port 5000!')
})



const http = require('http');
const  StringDecoder  = require('string_decoder').StringDecoder;
const _file = require('./test')

const server = http.createServer((req,res)=>{
    const decoder = new StringDecoder('utf8')
    let buffer ='';
    req.on('data', (chunk)=>{
        buffer += decoder.write(chunk)
    });
    req.on('end',()=>{
      buffer += decoder.end() ;
      res.setHeader('Content-Type','application/json');  
      res.writeHead(200)   
      res.write(buffer + '\n')
      res.end('Hello Opeyemi') 
      _file.create('data2.json',(err)=>{
        console.log('Result:',err)
      });
    });
    

});

server.listen(3000,()=>{
    console.log('Server is Listening on port 3000!')
});

*/
const helpers = (stringLength)=>{
    stringLength = typeof(stringLength) === 'number' &&  stringLength > 0 ? stringLength : false;
    if(stringLength){
        // Define all the possible characters.
        const possibleCharacter = 'abcdefghijklmnopqrstuvwxyz0123456789';
        // Start the final string.
        let str = '';
        for(i = 1; i <= stringLength; i++){
            // Get random characters from possibleChracters
            // const randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length)); 
            const randomCharacter = possibleCharacter.charAt((Math.random() * possibleCharacter.length)); 
            // Append the character to final string.
            str += randomCharacter;
        }
        // Return the final string
        return str;
    }else{
        return false;
    }
};

console.log(helpers(20));
const value = '1,2,3,4,5,6 7'
// console.log(value.length)

// console.log((Math.random() * value.length))
console.log(Date.now());

const protocol = 'ssh'
result = ['http','https','ssh'].indexOf(protocol) > -1 ? true : false;
console.log(result)
// console.log(protocol.indexOf('https'))


const uniqueInputs = ['man','help','exit','stats','list users','more user info','list checks','more check info','list logs','more log info'];
uniqueInputs.some((inputs)=>(
    console.log(inputs)
))