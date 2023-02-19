/*
function first(){
    console.log('First')
}
function second(){
    first()
    console.log('Second Func')
}
function third(){
    second()
    console.log('Third Func')
}
function main(){
    third()
    // console.log('Main')
    // setTimeout(() => {
    //     first()
    //     second()
    // }, 1000);
}
// main()
function First(Callback){
    setTimeout(() => {
        console.log('I should go First');
        Callback()
    },1000);
}
function Second(){
    setTimeout(() => {
        console.log('I should go Second');
    },1000);
}
function First(Callback){
    setTimeout(() => {
        console.log('I should go First');
        Callback()
    },1000);
}
function Second(){
    console.log('I should go Second')
}
First(Second);
function First(Callback){
    setTimeout(() => {
        console.log('I should go First');
        Callback('Hello')
    },1000);
}
function Second(){
    // console.log('I should go Second')
}
First(Second);
// First()
const fruits = ['Apple','Bannana','Orange']
fruits.forEach((item,index) => {
    // console.log(index)
});
const userData = []
function logData(data){
    if(typeof data === 'string'){
        console.log(data)
    }else{
        console.log('Not String')
    }
}
function setData(option,Callback){
    userData.push(option)
    Callback(option)
}
// setData({Name:'Opeyemi'},logData)
// console.log(userData)
// Define all the handlers
var handlers = {};
function Second(){
    setTimeout(() => {
        console.log('I should go Second');
    },1000);
}
// let value;
// console.log(value)
// confirm = value ? console.log(true):console.log(value);
fs.writeFile(file, 'Hello World!',function(err){
    if(err){
        console.log('There Was an Error')
    }else{console.log('File Written Successfully')
    }    
})
fs.appendFile(file,'Whao NodeJS is wonderful',function(err ){
    if(err){
        throw err;
    }else{
        console.log('File Appended')
    }
})
fs.readFile(file,function(err,data){
    if(!err){
        console.log(data)
    }
});
const fs = require('fs');
const file = 'file.txt';
const lib = {};
// Opening The File..
lib.create = fs.open(file,'w',function(err,fileDescriptor){
    if(!err){
        console.log('File Successfully Opened');
        // Writing the File.
        fs.writeFile(fileDescriptor,'Hello There User',function(err){
            if(!err){
                console.log('File Written Successfully')
            }else{
                console.log('Error Writing to File')
            }
        // Reading The File..
        fs.readFile(file,function(err,data){
            if(!err){
                console.log('The File read is :',data.toString())
            }else{
                console.log('Error reading File')
            }
            //  Closing The file
            fs.close(fileDescriptor,function(err){
                if(!err){
                    console.log('File Successfully Closed')
                }else{
                    console.log('Error closing File')
                }
            })
            setTimeout(() => {
                fs.unlink(file,(err)=>{
                    if(!err){
                        console.log('File Deleted Successfully')
                    }else{
                        console.log('Error deleting File')
                    }
                })
            }, 2000);
        });
        
    });
    }else{
        console.log('Error opening File')
    }
})
const acceptableMethods = ['post','get','put','delete'];
data = 'get'
console.log(acceptableMethods.indexOf(data))
if(acceptableMethods.indexOf(data) > -1){
    console.log(true)
}else{
    console.log(false)
}
const fs = require('fs');
const http = require('http');
const lib = {};
file = 'data.txt';
lib.create = function(path,data,Callback){
    fs.open(path,'w',function(err,fileDescriptor){
        if(!err){
            fs.writeFile(fileDescriptor,data,(err)=>{
                if(!err){
                    Callback('File Successfully Written')
                }else{
                    Callback('Error Writing to File')
                }
            });
        }else{
            Callback('Error Opening File')
        }
    });
};
lib.read = function(path,Callback){
    fs.readFile(path,(err,data)=>{
        if(!err){
            Callback('File Successfully Read')
        }else{
            Callback('Error reading from File')
        }
    });
};
// lib.create(file,'hello boss',function(err){
//     console.log('Result:',err)
// });+
// lib.read(file,function(err){
//     console.log('Result:',err)
// });
module.exports = lib;
// const fs = require('fs');
  
// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync(file,
            {encoding:'utf8', flag:'r'});
 
// Display the file data
console.log(data);
Promise.resolve('Hi')
    .then(data => {
        return new Promise((resolve, reject) => {
            resolve(data + ' There');
        });             
    }).then(data => {
        return new Promise((resolve, reject) => {
            resolve(data + ' Chris');
        });
    }).then(data => {
        console.log(data)
    })
const fs = require('fs');
const http = require('http');
// const done = true;
function call(textData){
    return new Promise((resolve,reject)=>{
        if(textData){
            resolve('OK')
        }else{
            reject('Not OK!')
        }
    });
}
call(true)
    .then((data) => console.log(data))
    .catch((data) => console.log(data))
function callling(textData){
        Promise.resolve(textData)
            .then(data =>{
                return new Promise((resolve, reject) => {
                    if(data){
                        resolve(data)
                    }else{
                        reject('Error')
                    }
                });
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
};
// callling('Hello Chris')
file = 'info.txt'
function createFile(path,dataFile){
    Promise.resolve(path,dataFile)
        .then(pathData => {
            return new Promise((resolve,reject)=>{
                fs.open(pathData,'w',function(err,fileDescriptor){
                    if(!err && fileDescriptor){
                        resolve(fileDescriptor)
                    }else{
                        reject('Error Opening File')
                    }
                });              
            })
        }).then(data =>{
            return new Promise((resolve,reject)=>{
                fs.writeFile(data,dataFile,(err)=>{
                    if(!err){
                        resolve('File Successfully Written')
                    }else{
                        reject('Error Writing to File')
                    }
                });
            })
        }).then(data =>{
            return new Promise((resolve,reject)=>{
                fs.readFile(path,(err,data)=>{
                    if(!err && data){
                        resolve(data.toString())
                    }else{
                        reject('Error Reading File')
                    }
                });
            })
        }).then(data => console.log(data))
        .catch(err => console.log(err))
}
// createFile(file,helpers(20))
function helpers(stringLength){
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
const querystring = require('node:querystring');
const payload = {
    From: 'config.twilio.fromPhone',
    To: '+234+phone',
    Body: 'msssg'
};
const stringPayload = querystring.stringify(payload);
console.log(stringPayload)
console.log(Buffer.byteLength(stringPayload))
const crypto = require('crypto')
const config = {
    hashingSecret:'hello'
}
const hash = function(str){
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hash
    }else{
        return false;
    }
}
const hash1 = hash('jembe');
const hash2 = hash('jembe');
// console.log(hash('Jembe'));
console.log(hash1);
console.log(hash2);
if(hash1 === hash2){
    console.log(true)
}else{
    console.log(false)
}
const fs = require('fs');
const path = require('path');
// Container for module to be exported.
const lib = {};
// Base directory of data folder.
// lib.baseDir = path.join(__dirname,'/../.data/');
lib.baseDir = path.join(__dirname,'/RestfulAPI/.data/');
console.table(lib)
lib.phone = 'man'
lib.course = 'hello'
console.log(lib)
const data = {
    trimmedPath:'trimmedPath',
    queryStringObj:'queryStringObj',
    method:'method',
    headers:'headers',
    payload:'helpers.parseJsonToObject(buffer)'
};
const text = '["Ford", "BMW", "Audi", "Fiat"]';
const myArr = JSON.parse(text);
const out = {
    names: 'Ope',
    level: 'Middle'
};
const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
// console.log(JSON.stringify(data))
console.log(obj)
console.log(myArr)
const file = 'abcd'
console.log(file.indexOf('c'))
console.log(data.hasOwnProperty('method'))
for(x in data){
    if(data.hasOwnProperty(x)){
        out['global.'+x] = data[x]
        const replace = data[x]
        const find = '{'+x+'}'
        // console.log(find)
    } 
}
console.log(out)
*/

const launches = new Map();

const launch = {
    flightNo: 100,
    mission: 'Explorer',
    upcoming: true,
    success: true
}

launches.set(launch.flightNo, launch)
console.log(Array.from(launches.values()))