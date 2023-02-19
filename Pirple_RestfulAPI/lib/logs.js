// Library for storing and rotating logs

const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

// Container for the module
const lib = {};

// base directory for the log folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append the string to a file, create the file if it doesn't exists
lib.append = (file,str,Callback)=>{
    // Open the file for appending
    fs.open(lib.baseDir+file+'.log','a',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // Append the file and close it
            fs.appendFile(fileDescriptor,str+'\n',function(err){
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                            Callback(false);
                        }else{
                            Callback('Error closing file that was been appended');
                        }
                    });
                }else{
                    Callback('Error appending to file');
                }
            });
        }else{
            Callback('Could not open the file for appending');
        }
    });
}

// List all the logs and optionally include the compressed logs
lib.list = (includeCompressedLogs,Callback)=>{
    fs.readdir(lib.baseDir,(err,data)=>{
        if(!err && data && data.length > 0){
            const trimmedFileNames = [];
            data.forEach(fileName => {
                // Add the .log files
                if(fileName.indexOf('.log') > -1){
                    trimmedFileNames.push(fileName.replace('.log',''));
                }

                // Add on the .gz files
                if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
                    trimmedFileNames.push(fileName.replace('.gz.b64',''));
                }
            });
            Callback(false,trimmedFileNames);
        }else{
            Callback(err,data)
        }
    });
};


// Compress the content of one .log file into a gz.b64 file within the same directory
lib.compress = (logID,newFIleID,Callback)=>{
    const sourceFile = logID+'.log';
    const destFile = newFIleID+'.gz.b64';
    // Read the source file
    fs.readFile(lib.baseDir+sourceFile,'utf8',(err,inputString)=>{
        if(!err && inputString){
            zlib.gzip(inputString,(err,buffer)=>{
                if(!err && buffer){
                    // Send the data to the destination file
                    fs.open(lib.baseDir+destFile,'wx',(err,fileDescriptor)=>{
                        if(!err && fileDescriptor){
                            // Write to the destination file
                            fs.writeFile(fileDescriptor,buffer.toString('base64'),(err)=>{
                                if(!err){
                                    // Close the destination file
                                    fs.close(fileDescriptor,(err)=>{
                                        if(!err){
                                            Callback(false);
                                        }else{
                                            Callback('Error Closing File');
                                        }
                                    });
                                }else{
                                    Callback('Error Writing to File');
                                }
                            })
                        }else{
                            Callback('Error Opening File');
                        }
                    });
                }else{
                    Callback('Error in Zipping of files');
                }
            });
        }else{
            Callback('Error Reading Compress Files');
        }
    });
};

// Decompress the content of a .gz.b64 file into a string variable.
lib.decompress = (fileID,Callback)=>{
    const fileName = fileID+'.gz.b64';
    fs.readFile(lib.baseDir+fileName,'utf8',(err,str)=>{
        if(!err && str){
            // Decompress the data
            const inputBuffer = Buffer.from(str,'base64');
            zlib.unzip(inputBuffer,(err,outputBuffer)=>{
                if(!err && outputBuffer){
                    // Callback
                    const str = outputBuffer.toString();
                    Callback(false,str);
                }else{
                    Callback('Error in Unzipping Bufffer')
                }
            });
        }else{
            Callback('Error in reading Decompressed File');
        }
    });
};


// Truncate the log files
lib.truncate = (logID,Callback)=>{
    fs.truncate(lib.baseDir+logID+'.log',0,(err)=>{
        if(!err){
            Callback(false);
        }else{
            Callback('Error truncating files')
        }
    });
};


// Export the module
module.exports = lib;