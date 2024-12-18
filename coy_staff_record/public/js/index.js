import '@babel/polyfill';
import {sendCreateNewEmployeeRecord ,sendUpdatedEmployeeRecord, fetchAllPayGroup, addEmployeeToPayGroup, ProcessUpdatedEmployeePayGroup,
  deleteEmployeeData, sendCreateNewPayGroupRecord
} 
from './processData';
// GLOBAL VARIABLE
const bootbox_cta_fsize = 'fs-4'

// Employee Query Selector
const createNewEmployeeRecord = document.querySelector('.create-employee')
const updatedEmployeeRecord = document.querySelector('.modify-employee-update');
const deletedEmployeeRecord = document.querySelector('.modify-employee-delete');
const addEmployeePayGroup = document.querySelector('.addEmployeeToPayGroup');
const updatedEmployeePayGroup = document.querySelector('.modify-employeePayGroup');

// PayGroup Query Selector
const createNewPayGroupRecord = document.querySelector('.create-paygroup')
const payGroupPopUp = document.querySelector('.PopupPayGroupSelection');

// Employee Section
if(createNewEmployeeRecord){
  createNewEmployeeRecord.addEventListener('submit', async event => {
    event.preventDefault();
    document.querySelector('.btn--cta--save').textContent = 'Saving..'
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const nationality = document.getElementById('nationality').value;

    await sendCreateNewEmployeeRecord(firstname,lastname,email,phone,state,city,address,nationality );
    document.querySelector('.btn--cta--save').textContent = 'create employee'
  });
};

if(updatedEmployeeRecord){
  updatedEmployeeRecord.addEventListener('submit',  async event => {
    event.preventDefault();
    document.querySelector('.btn--cta--save').textContent = 'Updating..'
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const nationality = document.getElementById('nationality').value;
    const id = document.getElementById('docid').value;

    await sendUpdatedEmployeeRecord(id,firstname,lastname,phone,email,address,state,city,nationality);
    document.querySelector('.btn--cta--save').textContent = 'Save Record'
  });
};

if(addEmployeePayGroup){
  addEmployeePayGroup.addEventListener('submit', async event =>{
    event.preventDefault();
    document.querySelector('.popup--cta--save').textContent = 'Saving..'
    const employeeId = document.getElementById('docid').value;
    const payGroupSelected = document.getElementById('addPayGroupSelection').value; 

    await addEmployeeToPayGroup(employeeId,payGroupSelected);
    document.querySelector('.popup--cta--save').textContent = 'Save'
  });
}

if(updatedEmployeePayGroup){
  updatedEmployeePayGroup.addEventListener('submit', async event => {
    event.preventDefault();
    document.querySelector('.popup--cta--save').textContent = 'Updating..'
    const employeeId = document.getElementById('docid').value; 
    const payGroupSelected = document.getElementById('updatePayGroupSelection').value;

    await ProcessUpdatedEmployeePayGroup(employeeId,payGroupSelected);
    document.querySelector('.popup--cta--save').textContent = 'Save'
  });
};

if(deletedEmployeeRecord){
  deletedEmployeeRecord.addEventListener('submit', async event => {
    event.preventDefault();
    const id = document.getElementById('docid').value;
    $(function(){
      $("#deleteEmployee").click(function () {
        bootbox.confirm({
          title: '<h5 class="text-danger text-uppercase">This will delete permanently</h5>',
          message: '<h4>Do you wish to continue?</h4>',
          buttons: {
          confirm: {
          label: 'Yes',
          className: `btn-success ${bootbox_cta_fsize}`
          },
          cancel: {
          label: 'No',
          className: `btn-danger ${bootbox_cta_fsize}`
          }
          },
          callback: async function (result) {
            if(result){
              await deleteEmployeeData(id);
            };
          }
        });
      });
  
    });

    
  });
};

// PayGroup Section
if(createNewPayGroupRecord){
  createNewPayGroupRecord.addEventListener('submit', async event => {
    event.preventDefault();
    document.querySelector('.btn--cta--save').textContent = 'Saving..'
    const category = document.getElementById('category').value;
    const basic = document.getElementById('basic').value.replace(/,/g, '');
    const housing = document.getElementById('housing').value.replace(/,/g, '');
    const transport = document.getElementById('transport').value.replace(/,/g, '');
    const utility = document.getElementById('utility').value.replace(/,/g, '');
    const tax = document.getElementById('tax').value.replace(/,/g, '');

    await sendCreateNewPayGroupRecord(category,basic,housing,transport,utility,tax);
    document.querySelector('.btn--cta--save').textContent = 'create paygroup'
  });
};

if(payGroupPopUp){
  const payGroupSelect = document.querySelector('.payGroupSelect');
  const payGroupPopUpForUpdate = document.querySelector('.payGroupSelectUpdate');
  if(payGroupPopUpForUpdate){
    const noneElement = document.createElement("option");
    noneElement.value = -1;
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