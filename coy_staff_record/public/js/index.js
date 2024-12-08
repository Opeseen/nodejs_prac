import '@babel/polyfill';
import {processUpdatedEmployeeRecord} 
from './processData';

// EMPLOYEE QUERY SELECTOR
const updatedEmployeeRecord = document.querySelector('.modify-employee');
const updatedEmployeePayGroup = document.querySelector('.modify-employeePayGroup');

// Employee Section
if(updatedEmployeeRecord){
  updatedEmployeeRecord.addEventListener('submit', event => {
    event.preventDefault();
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const nationality = document.getElementById('nationality').value;
    const id = document.getElementById('docid').value;

    processUpdatedEmployeeRecord(id,firstname,lastname,phone,email,address,state,city,nationality);
  });
};

if(updatedEmployeePayGroup){
  updatedEmployeePayGroup.addEventListener('submit', event => {
    event.preventDefault();
    const employeeId = document.getElementById('docid').value;
  });
};