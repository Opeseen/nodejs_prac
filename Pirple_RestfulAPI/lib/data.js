// Library for storing and editing data..

//  Dependencies..

const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Container for module to be exported.
const lib = {};
// Base directory of data folder.
lib.baseDir = path.join(__dirname,'/../.data/');

// Write data to a file.
lib.create = function(dir,file,data,Callback){
    //  Open file for writing.
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            //  Convert data to string.
            const stringData = JSON.stringify(data);
            // write the file and close it.
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                            Callback(false);
                        }else{
                            Callback('Error closing newFile.');
                        }
                    });
                }else{
                    Callback('Error writing to NewFIle.');
                }
            });
        }else{
            Callback('Could not create a newfile, as it may already exist.');
        }
    });
};

// Read data from a file..
lib.read = function(dir,file,Callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        if(!err && data){
            const parsedData = helpers.parseJsonToObject(data);
            Callback(false,parsedData);
        }else{
            Callback(err,data);
        }
    });
};

// Update data inside a file.
lib.update = function(dir,file,data,Callback){
    // Open file for reading.
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            // Convert data to string
            const stringData = JSON.stringify(data);
            // Truncate the file..
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    // Write to the File and Close It.
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    Callback(false)
                                }else{
                                    Callback('Error closing the File')
                                }
                            });
                        }else{
                            Callback('Error Writing to existing File.')
                        }
                    });
                }else{
                    Callback('Error Truncating File')
                }
            });
        }else{
            Callback('Could not open file for update as it may not exist yet. ')
        }
    });    
}

//  Delete a File..
lib.delete = (dir,file,Callback)=>{
    // Unlink the file.
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            Callback(false)
        }else{
            Callback('Error deleting File')
        }
    });
}


// List all the items in a directory.
lib.list = function(dir,Callback){
    fs.readdir(lib.baseDir+dir+'/',function(err,data){
        if(!err && data){
            const trimmedFileNames = [];
            data.forEach((fileName)=>{ 
                trimmedFileNames.push(fileName.replace('.json',''));
            });
            Callback(false,trimmedFileNames);
        }else{
            Callback(err,data);
        }
    });
};


// Export the module
module.exports = lib;
// console.table(lib)