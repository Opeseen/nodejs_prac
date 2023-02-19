// Dependencies
const path = require('path');
const fs = require('fs');
const _data = require('./data');
const http = require('http');
const https = require('https');
const helpers = require('./helpers');
const url = require('url');
const _logs = require('./logs');
const util = require('util');
const debug = util.debuglog('workers');

// Instantiate the workers object
const workers = {};

// LookUp all checks and get their data, wile also send to a validator
workers.gatherAllChecks = ()=>{
    // Gather all the checks
    _data.list('checks',(err,checks)=>{
        if(!err && checks && checks.length > 0){
            checks.forEach(checks => {
                // Read in the checks data
                _data.read('checks',checks,(err,originalCheckData)=>{
                    if(!err && originalCheckData){
                        // Pass it to the checks validator
                        workers.validateChecksData(originalCheckData);
                    }else{
                        debug('Error reading one of the checks data')
                    }
                });
            });
        }else{
            debug("Error: Could not find any checks to process.")
        }
    });
};

// Sanity-checking of the check-data
workers.validateChecksData = (originalCheckData)=>{
    originalCheckData = typeof(originalCheckData) === 'object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.id == typeof(originalCheckData.id) === 'string' && originalCheckData.id.trim().length === 20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone == typeof(originalCheckData.userPhone) === 'string' && originalCheckData.userPhone.trim().length === 10 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol == typeof(originalCheckData.protocol) === 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
    originalCheckData.url == typeof(originalCheckData.url) === 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method == typeof(originalCheckData.method) === 'string' && ['post','get','put','delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes == typeof(originalCheckData.successCodes) === 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeoutSeconds == typeof(originalCheckData.timeoutSeconds) === 'number' && originalCheckData.timeoutSeconds % 1 === 0  && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds : false;

    // Set the keys that may not be set if the workers have never seen the checks before.
    originalCheckData.state = typeof(originalCheckData.state) === 'string' && ['up','down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked == typeof(originalCheckData.lastChecked) === 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

    // If all the checks pass - then pass the data along to the next steps
    if(
        originalCheckData.id &&
        originalCheckData.userPhone && 
        originalCheckData.protocol && 
        originalCheckData.url &&  
        originalCheckData.method && 
        originalCheckData.successCodes && 
        originalCheckData.timeoutSeconds){
            workers.performCheck(originalCheckData);
        }else{
            debug('Error: One of the checks is not properly formatted')
        };
};

// Perform the check and send the originalCheckData and the outcome of the check process to the next step in the process.
workers.performCheck = (originalCheckData)=>{
    // Prepare the initial check outcome
    const checkOutcome = {
        error: false,
        responseCode: false
    };

    // Mark that the outcome has not been sent yet
    let outcomeSent = false;
    // Parse the hostname and the path out of the original check data.
    const parseUrl = url.parse(originalCheckData.protocol+'://'+originalCheckData.url, true);
    const hostname = parseUrl.hostname;
    const path = parseUrl.path;

    // Construct the request
    const requestDetails = {
        protocol: originalCheckData.protocol+':',
        hostname: hostname,
        method: originalCheckData.method.toUpperCase(),
        path: path,
        timeout: originalCheckData.timeoutSeconds * 1000
    };

    // Instantiate the request object using either Http/Https
    const _moduleToUse = originalCheckData.protocol === 'http' ? http : https;
    const req = _moduleToUse.request(requestDetails,(res)=>{
        // Grab the status of the sent request
        const status = res.statusCode;
    

        // Update the check data and pass the data along
        checkOutcome.responseCode = status;
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;
        };
    
    });

    // Bind to the error event so it doesnt get thrown
    req.on('error',(err)=>{
        // Update the checkOutcome and pass the data along
        checkOutcome.error = {
            error: true,
            value: err
        };
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;          
        }
    });

    // Bind to the timeoutSecondsS
    req.on('timeout',(err)=>{
        // Update the checkOutcome and pass the data along
        checkOutcome.error = {
            error: true,
            value: 'timeout'
        };
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome);
            outcomeSent = true;          
        }
        
    });

    // End the request
    req.end();

};

// Process the check outcome, update the check data as needed and trigger an alet if needed. And...
// ...Special logic for accomodating a check that has not been tested befor - and not also to alert on it.
workers.processCheckOutcome = function(originalCheckData,checkOutcome){
    // Decide if the check is considered up or down
    const state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';
    // Decide if an alert is warranted
    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    const timeofCheck = Date.now();
    workers.log(originalCheckData,checkOutcome,state,alertWarranted,timeofCheck);
    // Update the check data.
    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = timeofCheck;

    // Save the updates
    _data.update('checks',newCheckData.id,newCheckData,(err)=>{
        if(!err){
            // Send the data to the next phrase in the process if needed
            if(alertWarranted){
                workers.aletUserToStatusChange(newCheckData);
            }else{
                debug('Check outcome '+newCheckData.id+' has not changed - so no alert needed')
            }
        }else{
            debug('Error trying to save updates to the checks')
        }
    });
};

// Alert the user as to the change in the check status
workers.aletUserToStatusChange = (newCheckData)=>{
    const mssg = 'Alert: Your check for '+newCheckData.method.toUpperCase()+' '+newCheckData.protocol+'://'+newCheckData.url+' is currently '+newCheckData.state;
    helpers.sendTwilioSms(newCheckData.userPhone,mssg,(err)=>{
        if(!err){
            debug('Success: User was alerted to a status change in their check Via SMS: ',mssg)
        }else{
            debug('Error: could not send SMS to user who had a state change in their check')
        }
    });
};

workers.log = function(originalCheckData,checkOutcome,state,alertWarranted,timeofCheck){
    // Form the Log data.
    const logData = {
        check: originalCheckData,
        outcome: checkOutcome,
        state: state,
        alert: alertWarranted,
        time: timeofCheck
    };
    // convert data to string
    const logString = JSON.stringify(logData);
    // Determine the name of the log file
    const logFileName = originalCheckData.id;
    // Append the log stream to the file
    _logs.append(logFileName,logString,(err)=>{
        if(!err){
            debug('Logging to file succeeded');
        }else{
            debug('Logging to file failed.');
        }
    });
};

// Timer to execute the worker-process once-per minutes
workers.loop = function(){
    setInterval(() => {
        workers.gatherAllChecks();
        console.log()
    }, 1000 * 60);
};

// Timer to execute the log-rotation process once per day
workers.logRotationLoop = function(){
    setInterval(() => {
        workers.rotateLogs();
        console.log()
    }, 1000 * 60 * 60 * 24);
};

// Rotate (compress) files
workers.rotateLogs = ()=>{
    // List all the non compress logs files
    _logs.list(false,(err,logs)=>{
        if(!err && logs && logs.length > 0){
            logs.forEach(logName => {
                // Compress the data to a differnt folderx
                const logID = logName.replace(',log','');
                const newFileID = logID+'-'+Date.now();
                _logs.compress(logID,newFileID,(err)=>{
                    if(!err){
                        // Trucate the logs
                        _logs.truncate(logID,(err)=>{
                            if(!err){
                                debug('Success truncating log files');
                            }else{
                                debug('Error truncating log files');
                            }
                        });
                    }else{
                        debug('Error compressing one of the log files');
                    }
                });
            });
        }else{
            debug('Error: Could not find any logs to rotate');
        }
    });
};

// Init script
workers.init = function(){
    // Execute all the checks immediately
    workers.gatherAllChecks();
    // Call the Loop so that the checks will execute later on
    workers.loop();
    // compress all the logs immediately
    workers.rotateLogs();
    // call the compress loop so logs will be compressed later on
    workers.logRotationLoop();
    // Send to the console in Yellow
    console.log('\x1b[33m%s\x1b[0m', 'Background Workers are Working')
};




// Export the module
module.exports = workers;