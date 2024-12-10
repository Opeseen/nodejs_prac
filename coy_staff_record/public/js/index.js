import '@babel/polyfill';
import {sendCreateNewEmployeeRecord ,sendUpdatedEmployeeRecord, fetchAllPayGroup, addEmployeeToPayGroup} 
from './processData';

// Employee Query Selector
const createNewEmployeeRecord = document.querySelector('.create-employee')
const updatedEmployeeRecord = document.querySelector('.modify-employee');
const addEmployeePayGroup = document.querySelector('.addEmployeeToPayGroup');
const updatedEmployeePayGroup = document.querySelector('.modify-employeePayGroup');

// PayGroup Query Selector
const payGroupPopUp = document.querySelector('.PopupPayGroupSelection');

// Employee Section
if(createNewEmployeeRecord){
  createNewEmployeeRecord.addEventListener('submit', event => {
    event.preventDefault();
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const nationality = document.getElementById('nationality').value;

    sendCreateNewEmployeeRecord(firstname,lastname,email,phone,state,city,address,nationality );
  });
};

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

if(addEmployeePayGroup){
  addEmployeePayGroup.addEventListener('submit', event =>{
    event.preventDefault();
    const employeeId = document.getElementById('docid').value;
    const payGroupId = document.getElementById('addPayGroupSelection').value;

    addEmployeeToPayGroup(employeeId, payGroupId);
  });
}

if(updatedEmployeePayGroup){
  updatedEmployeePayGroup.addEventListener('submit', event => {
    event.preventDefault();
    const employeeId = document.getElementById('docid').value; 
    const payGroupId = document.getElementById('updatePayGroupSelection').value;

  });
};

// PayGroup Section
if(payGroupPopUp){
  const payGroupSelect = document.querySelector('.payGroupSelect');
  const payGroupPopUpForUpdate = document.querySelector('.payGroupSelectUpdate');
  if(payGroupPopUpForUpdate){
    const noneElement = document.createElement("option");
    noneElement.value = 'delete';
    noneElement.text = 'none';
    payGroupPopUpForUpdate.add(noneElement);
  }
  if(payGroupSelect){
    fetchAllPayGroup()
    .then(
      (data) => {
        if(data !== undefined){
          data.details.forEach((payGroup) => {
            const addElement = document.createElement("option");
            addElement.value = payGroup.id;
            addElement.text = payGroup.category;
            payGroupSelect.add(addElement);
          });
        }
      }
    );
  }
};