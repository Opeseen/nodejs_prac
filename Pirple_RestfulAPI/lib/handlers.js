/* 
* Request handlers
*/

// Dependencies...
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

// Define the handler
const handlers ={}

/* 
* HTML Handlers
*/

// Index handlers
handlers.index = (data,Callback)=>{
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Uptime Monitoring - Made Simple',
            'head.description': 'We offer free simple uptime monitoring for HTTP/HTTPS sites of all kinds. When your site goes down, we\'ll send you a text to let you know. ',
            'body.class': 'index',
            'body.paragraph': 'Congratulation on Your First Website'
        };

        // Read in a template as a string
        helpers.getTemplate('index',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};

// Create Account
handlers.accountCreate = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Create an Account',
            'head.description': 'SignUP is easy and only takes a few seconds.',
            'body.class': 'accountCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('accountCreate',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Create New Session
handlers.sessionCreate = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Login to your Account',
            'head.description': 'Please enter your phone number ans password to access your account.',
            'body.class': 'sessionCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionCreate',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Session has been deleted
handlers.sessionDeleted = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'You have been LoggedOut your Account',
            'head.description': 'Please enter your phone number and password to access your account.',
            'body.class': 'sessionCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('sessionDeleted',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};

// Edit Your Account
handlers.accountEdit = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        };

        // Read in a template as a string
        helpers.getTemplate('accountEdit',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Account has been deleted
handlers.accountDeleted = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Deleted',
            'body.class': 'accountDeleted',
            'head.description' : 'Your account has been deleted'
        };

        // Read in a template as a string
        helpers.getTemplate('accountDeleted',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Create a Check
handlers.checksCreate = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Create a new Checks',
            'body.class': 'checksCreate'
        };

        // Read in a template as a string
        helpers.getTemplate('checksCreate',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Dashboard (View all checks)
handlers.checksList = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Dashboard',
            'body.class': 'checksList'
        };

        // Read in a template as a string
        helpers.getTemplate('checksList',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};


// Edit a check
handlers.checksEdit = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Check Details',
            'body.class': 'checksEdit'
        };

        // Read in a template as a string
        helpers.getTemplate('checksEdit',templateData,function(err,str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,function(err,str){
                    if(!err && str){
                        // Return the page as HTML
                        Callback(200,str,'html');
                    }else{
                        Callback(500,undefined,'html');
                    }
                });
            }else{
                Callback(500,undefined,'html');
            }
        });
    }else{
        Callback(405,'undefined','html');
    }
};

handlers.favicon = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Read in the favicon data
        helpers.getStaticAsset('favicon.ico',function(err,data){
            if(!err && data){
                // Callback the data
                Callback(200,data,'favicon');
            }else{
                Callback(500);
            }
        });
    }else{
        Callback(405);
    }
};


// Public Assets

handlers.public = function(data,Callback){
    // Reject any request that isn't a GET
    if(data.method === 'get'){
        // Get the filename being replaced
        const trimmedAssetName = data.trimmedPath.replace('public','').trim();
        if(trimmedAssetName.length > 0){
            // Read in the asset data
            helpers.getStaticAsset(trimmedAssetName,function(err,data){
                if(!err && data){
                    // Determine the content-type (default to plain text)
                    let contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css'
                    }

                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png'
                    }

                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType = 'jpg'
                    }

                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon'
                    }

                    // Callback the data
                    Callback(200,data,contentType);

                }else{
                    Callback(404);
                }
            });
        }else{
            Callback(404);
            
        }
    }else{
        Callback(405);
    }
};




/* 
* JSON API Handlers
*/


// Example error
handlers.exampleError = function(data,Callback){
    const err = new Error('This is an example error');
    throw err;
};


//  Users handler
handlers.users = function(data,Callback){
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,Callback);
    }else{
        Callback(405);
    }
};

// Container for the users subMethods
handlers._users = {};

// Users - post
// Required data: firstname,lastname,phone,password,tosAgreement
// Options data: none
handlers._users.post = function(data,Callback){
// Check that all required fied are filled out.
const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

if(firstName && lastName && phone && password && tosAgreement){
    // Make sure that the user doesn't already exist.
    _data.read('users',phone,(err,data)=>{
        if(err){
            // Hash the password
            const hashPassword = helpers.hash(password);
            // Create the user object.
            if(hashPassword){
                const userObj = {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    hashPassword: hashPassword,
                    tosAgreement: true
                };
                // Store the user
                _data.create('users',phone,userObj,(err)=>{
                    if(!err){
                        Callback(200,{Success: 'User Created'});
                    }else{
                        console.log(err);
                        Callback(500,{Error :'Could not create the new user.'});
                    }
                });
            }else{
                Callback(500,{Error:'Could not hash the users password'})
            }
             
        }else{
            // User already exists
            Callback(400,{Error:'User with the phone number already exists'});
        }
   })

}else{
    Callback(400,{'Error':'Missing required field'});
  }
};

// Users - get
// Required data: phone
// Optional data: name
// @TODO Only let an authenticated user access their object and don't let them access anyone else.
handlers._users.get = function(data,Callback){
    // Check that the phone number is valid. 
    const phone = typeof(data.queryStringObj.phone) === 'string' && data.queryStringObj.phone.trim().length === 10 ? data.queryStringObj.phone.trim() : false;
    if(phone){
        // Get the token from the headers.
        const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the phone number.
        handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
            if(tokenIsValid){
                // Look Up the User..
                _data.read('users',phone,(err,data)=>{
                    if(!err){
                        // Remove the Hash password from the user Object.
                        delete data.hashPassword;
                        Callback(200,data);
                    }else{
                        Callback(404,{Error:'User Not Found'});
                    }
                });

            }else{
                Callback(403,{Error:'Missing Required token in Header or an invalid token.'});
            }
        });
    }else{
        Callback(400,{Error: 'Missing Required Phone Field!'})
    }
};

// Users - put
// Required data: phone
// Optional data: firstname, lsatname, password (at least one must be specified)
// @TODO Only let an authenticated user update their object and don't let them access anyone else.
handlers._users.put = function(data,Callback){
    // Checck for the require field
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;

    // Check for optional field
    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false; 
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false;

    // Error if phone is invalid
    if(phone){
        // Error if nothing is set to update.
        if(firstName || lastName || password){
            // Get the token from the headers.
            const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
            // Verify that the given token is valid for the phone number.
            handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
                if(tokenIsValid){
                    // Lookup the User
                    _data.read('users',phone,(err,userData)=>{
                        if(!err && userData){
                            // Update the field necessary.
                            if(firstName){
                                userData.firstName = firstName;
                            }
                            if(lastName){
                                userData.lastName = lastName;
                            }
                            if(password){
                                userData.hashPassword = helpers.hash(password)
                            }
                            // Store the new update.
                            _data.update('users',phone,userData,function(err){
                                if(!err){
                                    Callback(200,{Result: 'User Update Successful'})
                                }else{
                                    console.log(err);
                                    Callback(500,{Error: 'Could not update the user'});
                                }
                            });
                        }else{
                            Callback(400,{Error: 'The specified user does not exist'});
                        }
                    });
                    
                }else{
                    Callback(403,{Error:'Missing Required token in Header or an invalid token.'});
                }
            });                
        }else{
            Callback(400,{Error: 'Missing Field to Update'})
        }
    }else{
        Callback(400,{Error: 'Invalid Phone Number'})
    }
};

// Users - delete
// Required data: phone
// Clean up any other files associated with these users
// @TODO Only let an authenticated user delete their object and don't let them access anyone else.
handlers._users.delete = function(data,Callback){
    // Check that the phone number is valid
    const phone = typeof(data.queryStringObj.phone) === 'string' && data.queryStringObj.phone.trim().length === 10 ? data.queryStringObj.phone.trim() : false;
    if(phone){
        // Get the token from the headers
        const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the phone number.
        handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
            if(tokenIsValid){
                // Look Up the User..
                _data.read('users',phone,(err,userData)=>{
                    if(!err && userData){
                        _data.delete('users',phone,(err)=>{
                            if(!err){
                                 // Delete each of the checks associated with the user!
                                const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                const checksToDelete = userChecks.length;
                                if(checksToDelete > 0){
                                    let checksDeleted = 0;
                                    let deletionErrors = false;
                                    // Loop through the checks
                                    userChecks.forEach(checkID => {
                                        _data.delete('checks',checkID,(err)=>{
                                            if(err){
                                                deletionErrors = true;
                                            }
                                            checksDeleted++;
                                            if(checksDeleted === checksToDelete){
                                                if(!deletionErrors){
                                                    Callback(200,{Result:'All Checks Successfully Deleted'})
                                                    console.log(userChecks);
                                                }else{
                                                    Callback(500,{Result:'Errors encontered while attempting to delete all of the users checks. All checks moy not have been successfully deleted!'})
                                                }
                                            };
                                        });
                                    });
                                }else{
                                    Callback(200,{Result:'User Successfully Deleted!'})
                                }
                                
                            }else{
                                Callback(500,{Error:"Can't Delete Specified User"})
                            }
                        });
                    }else{
                        Callback(400,{Error:'Specified User Not Found'});
                    }
                });
            }else{
                Callback(403,{Error:'Missing Required token in Header or an invalid token.'});
            }
        });
        
    }else{
        Callback(400,{Error: 'Missing Required Phone Field!'})
    }
}

// Tokens handlers
handlers.tokens = function(data,Callback){
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._tokens[data.method](data,Callback);
    }else{
        Callback(405);
    }
};

// Container for all the tokens methods.
handlers._tokens = {};

// Tokens - Post
// Required data: phone, password
// Optionsl data: none
handlers._tokens.post = function(data,Callback){
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    if(phone && password){
        // LookUP the user who matches that phone number.
        _data.read('users',phone,(err,userData)=>{
            if(!err && userData){
                // Hash the sent password and compare it to the password stored in the userOBJ.
                const hashPassword = helpers.hash(password);
                if(hashPassword === userData.hashPassword){
                    // If valid create a new token with a Random Name.. set expiration date 1hr in the future.
                    const tokenId = helpers.createRandomString(20);
                    const expires = Date.now() + 1000 * 60 * 60;
                    const tokenObject = {
                        phone: phone,
                        id: tokenId,
                        expires: expires
                    };
                    // Store the token.
                    _data.create('tokens',tokenId,tokenObject,(err)=>{
                        if(!err){
                            Callback(200,tokenObject);
                        }else{
                            Callback(500,{Error:'Cound not create the new token.'})
                        }
                    });
                    
                }else{
                    Callback(400,{Error:'Password did not match the specified user!'})
                }
            }else{
                Callback(400,{Error:'Specified User Not Found!'})
            }
        });
    }else{
        Callback(400,{Error:'Missing required fields'})
    }
};

// Tokens - Get
// Required data -Id
// Optional data - none
handlers._tokens.get = function(data,Callback){
    // Check that the id is valid.
    const id = typeof(data.queryStringObj.id) === 'string' && data.queryStringObj.id.trim().length === 20 ? data.queryStringObj.id.trim() : false;
    if(id){
        // Look Up the Token..
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                Callback(200,tokenData);
            }else{
                Callback(404,{Error:'TokenID Not Found'});
            }
        })
    }else{
        Callback(400,{Error: 'Missing Required TokenID Field!'})
    }
};

// Tokens - Put
// Required data - id, extend
// Optional data - none
handlers._tokens.put = function(data,Callback){
    const id = typeof(data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
    const extend = typeof(data.payload.extend) === 'boolean' && data.payload.extend === true ? true : false;
    if(id && extend){
        // LookUP the user.
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                // Check to make sure the token is not already expired.
                if(tokenData.expires > Date.now()){
                    // Set the expirationan hour from now.
                    tokenData.expires = Date.now() + 1000 * 60 * 60;
                    // Store the new updates
                    _data.update('tokens',id,tokenData,(err)=>{
                        if(!err){
                            Callback(200,{Result:'Token Expiry Updated'})
                        }else(
                            Callback(500,{Error:'Token Expiry couldn\'t be updated'})
                        )
                    });
                }else{
                    Callback(400,{Error:'The token has already expired and can\'t be extended'})
                }
            }else{
                Callback(400,{Error:'Specified token doesn\'t exist'})
            }
        });
    }else{
        Callback(400,{Error:'Missing required fields or invalid field'})
    }
};

// Tokens - Delete
// Required data - id
// Optional data - none
handlers._tokens.delete = function(data,Callback){
    // Check that the id is valid
    const id = typeof(data.queryStringObj.id) === 'string' && data.queryStringObj.id.trim().length === 20 ? data.queryStringObj.id.trim() : false;
    if(id){
        // Look Up the User ID..
        _data.read('tokens',id,(err,data)=>{
            if(!err && data){
                _data.delete('tokens',id,(err)=>{
                    if(!err){
                        Callback(200,{Result:'User Token Successfully Deleted!'})
                    }else{
                        Callback(500,{Error:"Can't Delete Specified User Token"})
                    }
                });
            }else{
                Callback(400,{Error:'Specified Token Not Found'});
            }
        })
    }else{
        Callback(400,{Error: 'Missing Required Token Field!'})
    }
};

// Verify  if a given id is currently valid for a given users.
handlers._tokens.verifyToken = (id,phone,Callback)=>{
    // LookUP the token
    _data.read('tokens',id,(err,tokenData)=>{
        if(!err && tokenData){
            // Check that the token is for the given User and has not expired!
            if(tokenData.phone === phone && tokenData.expires > Date.now()){
                Callback(true);
            }else{
                Callback(false);
            }
        }else{
            Callback(false)
        }
    });
}

// Checks handlers
handlers.checks = function(data,Callback){
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._checks[data.method](data,Callback);
    }else{
        Callback(405);
    }
};

// Container for all the checks methods.
handlers._checks = {};

// Check - post
// Required data: protocol, url, methods, timeoutSeconds
// Optional Data: none

handlers._checks.post = function(data,Callback){
    // Validate all the imputs.
    const protocol = typeof(data.payload.protocol) === 'string' && ['http','https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) === 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;


    if(protocol && url && method && successCodes && timeoutSeconds){
        // Get the token from the headers
        const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
        // LookUP the user by reading the token provided from the file system
        _data.read('tokens',token,function(err,tokenData){
            if(!err && tokenData){
                const userPhone = tokenData.phone;
                // LookUP the user data.
                _data.read('users',userPhone,(err,userData)=>{
                    if(!err && userData){
                        const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                        // Verify that the user has the number of max check per Users!
                        if(userChecks.length < config.maxChecks){
                            // Create a random id for the checks.
                            const checkID = helpers.createRandomString(20);
                            // Create the check object and include the user phone number.
                            const checkObj = {
                                id: checkID,
                                userPhone: userPhone,
                                method: method,
                                protocol: protocol,
                                url: url,
                                successCodes: successCodes,
                                timeoutSeconds: timeoutSeconds
                            }
                            // Save the object.
                            _data.create('checks',checkID,checkObj,(err)=>{
                                if(!err){
                                    // Add the checkID to the userObj
                                    userData.checks = userChecks;
                                    userData.checks.push(checkID);

                                    // Save the New user Data
                                    _data.update('users',userPhone,userData,(err)=>{
                                        if(!err){
                                            // Return the data about the new checks.
                                            Callback(200,checkObj);
                                        }else{
                                            Callback(500,{Error:'Coundn\'t Update the user with the new checks'})
                                        }
                                    });
                            
                                }else{
                                    Callback(500,{Error:'Could not create the new Checks'})
                                }
                            });

                        }else{
                            Callback(400,{Error:'The user already has the maximum number of Checks => ('+config.maxChecks+')'})
                        }
                        
                    }else{
                        Callback(403,{Error:'Not Allowed => Can\'t find the specified User!'})
                    }
                });
            }else{
                Callback(403,{Error:'Not Authorized => Invalid token provided'})
            }
        });
    }else{
        Callback(400,{Error:'Invalid Inputs Entered!'});
    }
};


//  Get 
// Required Data - ID
// Optional data - none

handlers._checks.get = function(data,Callback){
    // Check that the phone number is valid. 
    const id = typeof(data.queryStringObj.id) === 'string' && data.queryStringObj.id.trim().length === 20 ? data.queryStringObj.id.trim() : false;
    if(id){
        // LookUp the check!
        _data.read('checks',id,(err,checkData)=>{
            if(!err && checkData){
                // Get the token from the headers.
                const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
                // Verify that the given token is valid for the User who created the check
                handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
                    if(tokenIsValid){
                        // Return the check data
                        Callback(200,checkData);

                    }else{
                        Callback(403,{Error:'Missing Required token in Header or an invalid token.'});
                    }
                });
                    
            }else{
                Callback(404,{Error:'Checks Not Found'})
            }
        });  
    }else{
        Callback(400,{Error: 'Missing Required Id Field!'})
    }
};


// Checks - Put
// Required Data - Id
// Optional Data - protocol, url, methods, successCodess, timeoutSeconds [one must be specified]
handlers._checks.put = function(data,Callback){
    // Checck for the require field
    const id = typeof(data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
     // Validate all the imputs.
    const protocol = typeof(data.payload.protocol) === 'string' && ['http','https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) === 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
    // Check to verify the required field
    if(id){
        // Check to verify the optional Fields
        if(protocol || url || method || successCodes || timeoutSeconds){
            // verify the check
            _data.read('checks',id,(err,checkData)=>{
                if(!err && checkData){
                    const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
                    // Verify that the given token is valid for the phone number.
                    handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid)=>{
                        if(tokenIsValid){
                            // Update the check where necessary
                            if(protocol){
                                checkData.protocol = protocol;
                            }
                            if(url){
                                checkData.url = url;
                            }
                            if(method){
                                checkData.method = method;
                            }
                            if(successCodes){
                                checkData.successCodes = successCodes;
                            }
                            if(timeoutSeconds){
                                checkData.timeoutSeconds = timeoutSeconds;
                            }

                            // Store the updates..
                            _data.update('checks',id,checkData,(err)=>{
                                if(!err){
                                    Callback(200,{Result:'Checks Successfully Updated'})
                                }else{
                                    Callback(500,{Error:'Could not update the check'})
                                }
                            });
                        }else{
                            Callback(403,{Error:'Invalid or Expired token'})
                        }

                    });

                }else{
                    Callback(400,{Error:'Check ID did not exists'})
                }
            });
        }else{
            Callback(400,{Error:'Missing Optional fields to update'})
        }
    }else{
        Callback(400,{Error:'Missing Required Field'})
    }
};


// Token - Delete
// required Data - ID
// Optional Data - None


handlers._checks.delete = function(data,Callback){
    // Check that the phone number is valid
    const id = typeof(data.queryStringObj.id) === 'string' && data.queryStringObj.id.trim().length === 20 ? data.queryStringObj.id.trim() : false;
    if(id){
        // LookUP the check to be deleted.
        _data.read('checks',id,(err,checkData)=>{
            if(!err && checkData){
                // Get the token from the headers
                const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
                // Verify that the given token is valid for the phone number.
                handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid)=>{
                    if(tokenIsValid){
                        // Delete the check data
                        _data.delete('checks',id,(err)=>{
                            if(!err){
                                // Look Up the User..
                                _data.read('users',checkData.userPhone,(err,userData)=>{
                                    if(!err && userData){
                                        const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        // Remove the delete checks from the list of checks.
                                        const checkPosition = userChecks.indexOf(id);
                                        if(checkPosition > -1){
                                            userChecks.splice(checkPosition,1);
                                            // Re-save the user data.
                                            userData.checks = userChecks;
                                            _data.update('users',checkData.userPhone,userData,(err)=>{
                                                if(!err){
                                                    Callback(200,{Result:'User Checks Successfully Updated and Deleted!'})
                                                    console.log(userData.checks)
                                                }else{
                                                    Callback(500,{Error:"Can't update Specified User"})
                                                }
                                            });    
                                        }else{
                                            Callback(500,{Error:'Could not find the check on the user object...So could not remove it'})
                                        }
                                        
                                    }else{
                                        Callback(400,{Error:'Specified User who created the check Not Found'});
                                    }
                                });

                            }else{
                                Callback(500,{Error:'Can\'t delete the Check data.'})
                            }
                        });

                    }else{
                        Callback(403,{Error:'Missing Required token in Header or an invalid token.'});
                    }
                });
            }else(
                Callback(400,{Error:'Specified CheckID doesn\'t Exists.'})
            )
        });
    }else{
        Callback(400,{Error: 'Missing Required ID Field!'})
    }
};




// Ping handler
handlers.ping = function(data,Callback){
    // Callback a http status code.
    Callback(200)
} 
// Not found handler
handlers.notFound = function(data,Callback){
    Callback(404)
}



module.exports = handlers;
// console.table(handlers)