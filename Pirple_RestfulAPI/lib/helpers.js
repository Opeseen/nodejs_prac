// Helpers for various tasks.

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const querystring = require('node:querystring');
const https = require('https');
const path = require('path');
const fs = require('fs');


// Container for the helpers.
const helpers = {};

// Sample for testing that simply return a number
helpers.getAnumber = function(){
    return 1
}

// Create a shuttle56 hash.
helpers.hash = function(str){
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hash
    }else{
        return false;
    }
}

// Parse a JSON string to an object in all cases without throwing an Error.
helpers.parseJsonToObject = function(str){
    try{
        const obj = JSON.parse(str);
        return obj;
    }catch(err){
        return {};
    }
};
// console.log()
// Create a string of randon alpha numeric objects of a given length.
helpers.createRandomString = (stringLength)=>{
    stringLength = typeof(stringLength) === 'number' &&  stringLength > 0 ? stringLength : false;
    if(stringLength){
        // Define all the possible characters.
        const possibleCharacter = 'abcdefghijklmnopqrstuvwxyz0123456789';
        // Start the final string.
        let str = '';
        for(i = 1; i <= stringLength; i++){
            // Get random characters from possibleChracters
            const randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length)); 
            // Append the character to final string.
            str += randomCharacter;
        }
        // Return the final string
        return str;
    }else{
        return false;
    }
};

// Send an SMS via Twilio
helpers.sendTwilioSms = function(phone,mssg,Callback){
    // Validate parameters
    phone = typeof(phone) === 'string' && phone.trim().length === 10 ? phone.trim() : false;
    mssg = typeof(mssg) === 'string' && mssg.trim().length > 0 && mssg.trim().length <= 1600 ? mssg : false;

    if(phone && mssg){
        // configure the request payload.
        const payload = {
            From: config.twilio.fromPhone,
            To: '+234'+phone,
            Body: mssg
        };

        // Stringfy the payLoad
        const stringPayload = querystring.stringify(payload);
        // Configure the request details.
        const requestedDetails ={
            protocol:'https:',
            hostname:'api.twilio.com',
            path:'/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
            method:'POST',
            auth: config.twilio.accountSid+':'+config.twilio.authToken,
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };
        // Instatiate the request details.
        const req = https.request(requestedDetails,(res)=>{
            // Grab the status of the sent request!
            const status = res.statusCode;
            // Callback successfully if the request went through.
            if(status === 200 || status === 201){
                Callback(false);
            }else{
                Callback('Status code was '+status);
            }
        });

        // Bind to the error event so it doesn't get thrown!
        req.on('error',(err)=>{
            Callback(err);
        });
        // Add the payload
        req.write(stringPayload);
        // End the request.
        req.end();
    }else(
        Callback('Given parameters missing/invalid.')
    )
};


// Get the string content of a template
helpers.getTemplate = (templateName,data,Callback)=>{
    templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName: false;
    data = typeof(data) === 'object' && data !== null ? data: {};
    if(templateName){
        const templateDir = path.join(__dirname,'/../templates/');
        fs.readFile(templateDir+templateName+'.html','utf8',(err,str)=>{
            if(!err && str && str.length > 0){
                // Do interpolation on the string
                const finalString = helpers.interpolate(str,data);
                Callback(false,finalString);
            }else{
                Callback('No template could be found');
            }
        });

    }else{
        Callback('A valid template name was not specified');
    }
}

// Add the unified header and footer to a string and pass the provided data object to the header and the footer for interpolation
helpers.addUniversalTemplates = (str,data,Callback)=>{
    str = typeof(str) === 'string' && str.length > 0 ? str: false;
    data = typeof(data) === 'object' && data !== null ? data: {};
    // Get Header
    helpers.getTemplate('_header',data,function(err,headerString){
        if(!err && headerString){
            // Get the Footer
            helpers.getTemplate('_footer',data,(err,footerString)=>{
                if(!err && footerString){
                    // Add them all together
                    const fullString = headerString+str+footerString;
                    Callback(false,fullString);
                }else(
                    Callback('Could not find the Footer Template')
                )

            });

        }else{
            Callback('Could not find the header Template');
        }
    });

}



// Take a given string and a data object and find and replace all the keys within it
helpers.interpolate = function(str,data){
    str = typeof(str) === 'string' && str.length > 0 ? str: false;
    data = typeof(data) === 'object' && data !== null ? data: {};
    // Add the template global do the data object, prepending their key name with global
    for(const keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data['global.'+keyName] = config.templateGlobals[keyName];
        } 
    }

    // For each key in the data object. Insert its value into the string at the corresponding placeholder
    for(const key in data){
        if(data.hasOwnProperty(key) && typeof(data[key]) === 'string'){
            const replace = data[key];
            const find ='{'+key+'}';
            str = str.replace(find,replace);
        }
    }
    return str;
};


// Get the content of a static asset
helpers.getStaticAsset = function(fileName,Callback){
    fileName = typeof(fileName) === 'string' && fileName.length > 0 ? fileName : false;
    if(fileName){
        const publicDir = path.join(__dirname,'/../public/');
        fs.readFile(publicDir+fileName,function(err,data){
            if(!err && data){
                Callback(false,data);
            }else{
                Callback('No file could be found');
            }
        });
    }else{
        Callback('A valid filename was not specified')
    }
}


// Export the module
module.exports = helpers;