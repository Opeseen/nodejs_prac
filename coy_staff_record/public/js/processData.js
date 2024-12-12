import axios from 'axios';
import {showAlert} from './alert';

// Employees Section
export const sendCreateNewEmployeeRecord = async(firstname,lastname,email,phone,
  state,city,address,nationality)=> {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/employee/create/new',
      data: {
        firstname,
        lastname,
        phone,
        email,
        address,
        state,
        city,
        nationality
      }
    });
    if(response.data.success){
      showAlert('success','Employee Details Successfully Created');
      window.setTimeout(() => {
        location.reload();
      },3000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message || "Error creating new employee");
  }
};

export const sendUpdatedEmployeeRecord = async(id,firstname,lastname,phone,email,
  address,state,city,nationality) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/employee/update',
      data: {
        id,
        firstname,
        lastname,
        phone,
        email,
        address,
        state,
        city,
        nationality
      }
    });
    if(response.data.success){
      showAlert('success','Employee Details Successfully Updated');
      window.setTimeout(() => {
        location.reload();
      },3000);
    }
  } catch (error) {
    return showAlert('error',error.response.data.message || "Error Updating Employee Record");
  }
};

export const ProcessUpdatedEmployeePayGroup = async(employeeId,payGroupId) => {
  if(payGroupId === 'undefined') return showAlert('error', 'Invalid Selection');
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/employee/paygroup/update',
      data: { employeeId,payGroupId }
    });
    if(response.data.success){
      showAlert('success',response.data.message);
      window.setTimeout(() => {
        location.reload();
      },3000);
    }
  } catch (error) {
    return showAlert('error',error.response.data.message || "Error Occurred Updating Employee PayGroup");
  }
};

export const deleteEmployeeData = async(eid) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/employee/delete',
      data: {eid}
    });
    if(response.data.success){
      showAlert('success',response.data.message);
      window.setTimeout(() => {
        location.assign('/employee/view/all');
      },3000);
    }
  } catch (error) {
    return showAlert('error',error.response.data.message || "Error Occurred Deleting Employee");
  }
};

// payGroup Section
export const fetchAllPayGroup = async() =>{
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/paygroup/view/all?reqType=clientRequest'
    });
    if(response.data.count > 0){ return response.data };
  } catch (error) {
    return showAlert('error',error.response.data.message || "Error Fetching PayGroup");
  }
};

export const addEmployeeToPayGroup = async(employeeId,payGroupId) => {
  if(payGroupId === 'undefined') return showAlert('error', 'Invalid Selection');
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/paygroup/employee/add',
      data: { employeeId,payGroupId }
    });
    if(response.data.success){
      showAlert('success',response.data.message);
      window.setTimeout(() => {
        location.reload();
      },3000);
    }
  } catch (error) {
    return showAlert('error',error.response.data.message || "Error Occurred Adding Employee To PayGroup");
  }
};


