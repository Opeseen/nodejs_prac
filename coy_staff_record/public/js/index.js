import '@babel/polyfill';
import {sendUpdatedEmployeeRecord, fetchAllPayGroup} 
from './processData';

// Employee Query Selector
const updatedEmployeeRecord = document.querySelector('.modify-employee');
const updatedEmployeePayGroup = document.querySelector('.modify-employeePayGroup');

// PayGroup Query Selector
const payGroupPopUp = document.querySelector('.PopupModifyEmployeePayGroup');

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

    sendUpdatedEmployeeRecord(id,firstname,lastname,phone,email,address,state,city,nationality);
  });
};

if(updatedEmployeePayGroup){
  updatedEmployeePayGroup.addEventListener('submit', event => {
    event.preventDefault();
    const employeeId = document.getElementById('docid').value;
  });
};

// PayGroup Section
if(payGroupPopUp){
  console.log(true)
}