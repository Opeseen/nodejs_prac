// Front-End Logic for the application.

// Container for the frontend application
const app = {};

// Config
app.config = {
    SessionToken: false
};

app.client = {};

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObj,payload,callback){
    // Set defaults.
    headers = typeof(headers) === 'object' && headers !== null ? headers : {};
    path = typeof(path) === 'string' ? path : '/';
    method = typeof(method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
    queryStringObj = typeof(queryStringObj) === 'object' && queryStringObj !== null ? queryStringObj : {};
    payload = typeof(payload) === 'object' && payload !== null ? payload : {};
    callback = typeof(callback) === 'function' ? callback : false;

    // For each querystring parameter - add it to path.
    let requestUrl = path+'?';
    let counter = 0;
    for(const querykey in queryStringObj){
        if(queryStringObj.hasOwnProperty(querykey)){
            counter ++;
            // if at least one query string parameter has already been added, then prepare new ones with anpercent
            if(counter > 1){
                requestUrl +='&';
            }
            // Add the key value
            requestUrl+=querykey+'='+queryStringObj[querykey];

        }
    }

    // Form the HTTP request as a json type.
    const xhr = new XMLHttpRequest();
    xhr.open(method,requestUrl,true);
    xhr.setRequestHeader('Content-type','application/json');

    // for each header sent, add it to the request
    for(const headerkey in headers){
        if(headers.hasOwnProperty(headerkey)){
            xhr.setRequestHeader(headerkey,headers[headerkey]);
        }
    }

    // If there is a current session token, add that as a header
    if(app.config.SessionToken){
        xhr.setRequestHeader('token',app.config.SessionToken.id);
    }

    // When the request comesback, handle the response
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            const statusCode = xhr.status;
            const responseReturned = xhr.responseText;

            // callback if requested.
            if(callback){
                try{
                    const parsedResponse = JSON.parse(responseReturned);
                    callback(statusCode,parsedResponse);
                }catch(err){
                    callback(statusCode,false);
                }
            }
        }
    }

    // Send the payload as JSON
    const payloadString = JSON.stringify(payload);
    console.log(payloadString);
    xhr.send(payloadString);
};

// Bind the logout button
app.bindLogoutButton = function(){
    document.getElementById('logoutButton').addEventListener('click',function(event){
        // Stop it from redirecting anywhere
        event.preventDefault();
        // Logout the user
        app.logUserOut();
    });
};


// Log the user out then redirect them
app.logUserOut = function(redirectUser){
    // Set redirectUser to default to true
    redirectUser = typeof(redirectUser) === 'boolean' ? redirectUser : true;
    // Get the current token id
    const tokenId = typeof(app.config.SessionToken.id) === 'string' ? app.config.SessionToken.id : false;
    // Send the current token to the token end point and delete it
    const queryStringObj = {id : tokenId};
    app.client.request(undefined,'api/tokens','DELETE',queryStringObj,undefined,function(statusCode,responsePayload){
        // Set the app.config token as false
        app.setSessionToken(false);
        // Send the user to the loggedOut page
        if(redirectUser){
            window.location = '/session/deleted';
        };
        
    });
};

// Bind the forms
app.bindForms = function(){
    if(document.querySelector("form")){
        let allForms = document.querySelectorAll('form');
        for(let i = 0; i < allForms.length; i++ ){
            allForms[i].addEventListener('submit',function(e){
                // Stop it from submitting
                e.preventDefault();
                var formId = this.id;
                var path = this.action;
                var method = this.method.toUpperCase();

                // Hide the error message (if it's currently shown due to a previous error)
                document.querySelector("#"+formId+" .formError").style.display = 'none';
                // Hide the success message (if it's currently shown due to a previous error)
                if(document.querySelector('#'+formId+' .formSuccess')){
                    document.querySelector('#'+formId+' .formSuccess').style.display = 'none';
                };

                // Turn the inputs into a payload
                var payload = {};
                var elements = this.elements;
                for(let i = 0; i < elements.length; i++){
                    // Determine the class of the elements and set value accordingly
                    let classOfElement = typeof(elements[i].classList.value) === 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '' ;
                    let valueOfElement = elements[i].type === 'checkbox' && classOfElement.indexOf('multiselect') === -1 ? elements[i].checked : classOfElement.indexOf('intval') === -1 ? elements[i].value : parseInt(elements[i].value);
                    let elementIsChecked = elements[i].checked;
                    // Overide the method of the form if the inputs name is _method
                    let nameOfElement = elements[i].name;
                    if(nameOfElement === '_method'){
                        method = valueOfElement;
                    }else{
                        // Create a payload field named 'method' if the elements name is actually httpmethod
                        if(nameOfElement === 'httpmethod'){
                            nameOfElement = 'method';
                        };

                        // Create an payload field named "id" if the elements name is actually uid
                        if(nameOfElement === 'uid'){
                            nameOfElement = 'id';
                        };
                        // // If the element has the class "multiselect" add its value(s) as array elements
                        if(classOfElement.indexOf('multiselect')> -1){
                            if(elementIsChecked){
                                payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                                payload[nameOfElement].push(valueOfElement);
                            };
                            
                        }else{
                            payload[nameOfElement] = valueOfElement;
                        };

                    };
                };
                

                // If the method is delete, the payload should be a queryStringObject instead.
                const queryStringObj = method === 'DELETE' ? payload : {}; 

                // Call the API
                app.client.request(undefined,path,method,queryStringObj,payload,function(statusCode,responsePayload){
                    // Display an error on the form if needed
                    if(statusCode !== 200){    
                        if(statusCode === 403){
                            // Log the user out
                            app.logUserOut();
                        }else{
                            // Try to get the error from the api, or set a default error message
                            var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';
                    
                            // Set the formError field with the error text
                            document.querySelector("#"+formId+" .formError").innerHTML = error;
                    
                            // Show (unhide) the form error field on the form
                            document.querySelector("#"+formId+" .formError").style.display = 'block';
                        };
                    } else {
                        // If successful, send to form response processor
                        app.formResponseProcessor(formId,payload,responsePayload);
                    };  
                });
            });
        };
    };
};
// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
    let functionToCall = false;
    // if account creation was successful, try to immediately log the user in
    if(formId === 'accountCreate'){
        // Take the phone and password, and use it to log the user in
        const newPayload = {
            phone: requestPayload.phone,
            password: requestPayload.password
        };

        app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
            // Display an error on the form if needed
            if(newStatusCode !== 200){
                // Set the formError field with the error text
                document.querySelector('#'+formId+' .formError').innerHTML = 'Sorry, an error has occured, please try again'
                // show (unhide) the form error field on the form
                document.querySelector('#'+formId+' .formError').style.display = 'block';
            }else{
                // If successful, set the token and redirect the user
                app.setSessionToken(newResponsePayload);
                window.location = '/checks/all';
            };
            
        });
    };

    // If login was successful, set the token in local storage and redirect the user
    if(formId === 'sessionCreate'){
        app.setSessionToken(responsePayload);
        window.location = '/checks/all';
    };

    // if forms saved successfully and they have success messages, show them
    let formsWithSuccessMessages = ['accountEdit1','accountEdit2','checksEdit1'];
    if(formsWithSuccessMessages.indexOf(formId) > -1){
        document.querySelector('#'+formId+' .formSuccess').style.display = 'block';
    };
    // If the user just deleted their account, redirect them to the account-delete page
    if(formId === 'accountEdit3'){
        app.logUserOut(false);
        window.location = ('/account/deleted');
    };

    // If the user just created a new check, successfully redirect back to the dashboard.
    if(formId === 'checksCreate'){
        window.location = '/checks/all';
    };
    // If the user just deleted a check, redirect them to the dashboard
    if(formId === 'checksEdit2'){
        window.location = '/checks/all';
    }

};

// Get the session token from local storage and set it in the app.config object
app.getSessionToken = function(){
    const tokenString = localStorage.getItem('token');
    if(typeof(tokenString) === 'string'){
        try{
            const token = JSON.parse(tokenString);
            app.config.SessionToken = token;
            if(typeof(token) === 'object'){
                app.setLoggedInClass(true);
            }else{
                app.setLoggedInClass(false);
            }
        }catch(err){
            app.config.SessionToken = false;
            app.setLoggedInClass(false);
        };
    };
};

// Set (or renew) the loggedIn class from the body
app.setLoggedInClass = function(add){
    const target = document.querySelector('body');
    if(add){
        target.classList.add('loggedIn');
    }else{
        target.classList.remove('loggedIn');       
    }
};

// Set the session token in the app.config object as well as local storage
app.setSessionToken = function(token){
    app.config.SessionToken = token;
    const tokenString = JSON.stringify(token);
    localStorage.setItem('token',tokenString);
    if(typeof(token) === 'object'){
        app.setLoggedInClass(true);
    }else{
        app.setLoggedInClass(false);
    }
};

// renew the token
app.renewToken = function(callback){
    const currentToken = typeof(app.config.SessionToken) === 'object' ? app.config.SessionToken : false;
    if (currentToken){
        // Update the token with a new expiration date
        const payload = {
            id: currentToken.id,
            extend: true
        };
        app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
            // Display an error if needed
            if(statusCode === 200){
                // Get the new token details
                const queryStringObj = {id: currentToken.id};
                app.client.request(undefined,'api/tokens','GET',queryStringObj,undefined,function(statusCode,responsePayload){
                    // Display an error on the form if needed
                    if(statusCode === 200){
                        app.setSessionToken(responsePayload);
                        callback(false);
                    }else{
                        app.setSessionToken(false);
                        callback(true);
                    }
                });
            }else{
                app.setSessionToken(false);
                callback(true);
            }
        });

    }else{
        app.setSessionToken(false);
        callback(true);     
    }
};

// Load data on the page
app.loadDataonPage = function(){
    // Get the current page from the body class
    const bodyClasses = document.querySelector('body').classList;
    const primaryClass = typeof(bodyClasses[0]) === 'string' ? bodyClasses[0] : false;
    // Logic for account setting page
    if(primaryClass === 'accountEdit'){
        app.loadAccountEditPage();
    };

    // Logic for dashboard page 
    if(primaryClass === 'checksList'){
        app.loadChecksListPage();
    };

    // Logic for check details page
    if(primaryClass === 'checksEdit'){
        app.loadChecksEditPage();
    };
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
    // Get the phone number from the current token, or log the user out if there is none
    const phone = typeof(app.config.SessionToken.phone) === 'string' ? app.config.SessionToken.phone : false;
    if(phone){
        // fetch the user data
        const queryStringObj = {'phone': phone};
        app.client.request(undefined,'api/users','GET',queryStringObj,undefined,function(statusCode,responsePayload){
            if(statusCode === 200){
                // Put the data into the forms as values where needed
                document.querySelector('#accountEdit1 .firstNameInput').value = responsePayload.firstName;
                document.querySelector('#accountEdit1 .lastNameInput').value = responsePayload.lastName;
                document.querySelector('#accountEdit1 .displayPhoneInput').value = responsePayload.phone;

                // Put the hidden phone field into both forms
                let hiddenPhoneInputs = document.querySelectorAll('input.hiddenPhoneNumberInput');
                for(let i = 0; i < hiddenPhoneInputs.length; i++){
                    hiddenPhoneInputs[i].value = responsePayload.phone;
                };
            }else{
                // If the request comes back as something other than 200, log thr user out (on the assumption that the api is temporarily down or the user token is bad)
                app.logUserOut();
            };
             
        });

    }else{
        app.logUserOut();
    };
};

// Load the dashboard page specifically
app.loadChecksListPage = function(){
    // Get the phone number from the current token, or log the user out if none is there
    const phone = typeof(app.config.SessionToken.phone) === 'string' ? app.config.SessionToken.phone : false;
    if(phone){
        // Fetch the User data
        const queryStringObj = {phone : phone};
        app.client.request(undefined,'api/users','GET',queryStringObj,undefined,function(statusCode,responsePayload){
            if(statusCode === 200){
                // Determine how many checks the user has
                const allChecks = typeof(responsePayload.checks) === 'object' && responsePayload.checks instanceof Array && responsePayload.checks.length > 0 ? responsePayload.checks : [];
                if(allChecks.length > 0){
                    // show each created check as a new row in the table
                    allChecks.forEach(function(checkId){
                        // Get the data for the check
                        const newQueryStringObject = {id : checkId};
                        app.client.request(undefined,'api/checks','GET',newQueryStringObject,undefined,function(statusCode,responsePayload){
                            if(statusCode === 200){
                                const checkData = responsePayload;
                                // Make the check data into a table row
                                let table = document.getElementById('checksListTable');
                                let tr = table.insertRow(-1);
                                tr.classList.add('checkRow');
                                let td0 = tr.insertCell(0);
                                let td1 = tr.insertCell(1);
                                let td2 = tr.insertCell(2);
                                let td3 = tr.insertCell(3);
                                let td4 = tr.insertCell(4);
                                td0.innerHTML = responsePayload.method.toUpperCase();
                                td1.innerHTML = responsePayload.protocol+'://';
                                td2.innerHTML = responsePayload.url;
                                const state = typeof(responsePayload.state) === 'string' ? responsePayload.state : 'unknown';
                                td3.innerHTML = state;
                                td4.innerHTML = '<a href="/checks/edit?id='+responsePayload.id+'">View / Edit / Delete</a>';                                
                            }else{
                                console.log('Error trying to load check ID: ',checkId);
                            };
                        });
                    });

                    if(allChecks.length < 5){
                        // Shoe the createCheck CTA
                        document.getElementById('createCheckCTA').style.display = 'block';
                    }

                }else{
                    // Show the createChecks CTA
                    document.getElementById('noChecksMessage').style.display = 'table-row';
                    // Show the createCheck CTA
                    document.getElementById('createCheckCTA').style.display = 'block';
                };

            }else{
                // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
                app.logUserOut();
            };
        });
    }else{
        app.logUserOut();
    };

};

// Load the checks edit page specifically
app.loadChecksEditPage = function(){
    // Get the check id from the query string, if none is founf then redirect back to the dashboard
    const id = typeof(window.location.href.split('=')[1]) === 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
    if(id){
        // fetch the check data
        const queryStringObj = {id : id};
        app.client.request(undefined,'api/checks','GET',queryStringObj,undefined,function(statusCode,responsePayload){
            if(statusCode === 200){
                // Put the hidden id field into both forms
                let hiddenIdInputs = document.querySelectorAll('input.hiddenIdInput');
                for (let i = 0; i < hiddenIdInputs.length; i++){
                    hiddenIdInputs[i].value = responsePayload.id;
                };

                // Put the data into the top form as values where needed
                document.querySelector('#checksEdit1 .displayIdInput').value = responsePayload.id;
                document.querySelector('#checksEdit1 .displayStateInput').value = responsePayload.state;
                document.querySelector('#checksEdit1 .protocolInput').value = responsePayload.protocol;
                document.querySelector('#checksEdit1 .urlInput').value = responsePayload.url;
                document.querySelector('#checksEdit1 .methodInput').value = responsePayload.method;
                document.querySelector('#checksEdit1 .timeoutInput').value = responsePayload.timeoutSeconds;
                let successCodeCheckboxes = document.querySelectorAll('#checkEdit1 input.successCodesInput');
                for(let i = 0; i < successCodeCheckboxes.length; i++){
                    if(responsePayload.successCodes.indexOf(parseInt(successCodeCheckboxes[i].value)) > -1){
                        successCodeCheckboxes[i].checked = true;
                    };
                };
            }else{
                // if the request comes back as something other than 200, redirect back to dashboard
                window.location = '/checks/all';
            };
        });
    }else{
        window.location = '/checks/all'
    };
    
};


// Loop to renew token often
app.tokenRenewalLoop = function(){
    setInterval(function(){
        app.renewToken(function(err){
            if(!err){
                console.log('Token renewed successfully @ '+Date.now());
            }
        });
    },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){
    // Bind all form submission
    app.bindForms();
    // Bind logout button
    app.bindLogoutButton();
    // Get the token from localStorage
    app.getSessionToken();
    // Renew token
    app.tokenRenewalLoop();
    // Load data on page;
    app.loadDataonPage();
};

// Call the init processes after the window loads
window.onload = function(){
    app.init()
};