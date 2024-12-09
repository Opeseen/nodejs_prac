import axios from 'axios';
import {showAlert} from './alert';

// Employees Section
export const sendUpdatedEmployeeRecord = async(id, firstname, lastname, phone, email,
  address, state, city, nationality) => {
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
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};


// payGroup Section
export const fetchAllPayGroup = async() =>{
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/paygroup/view/all?reqType=clientRequest'
    });
    if(response.data.count > 0){ return result.data.details };
  } catch (error) {
    console.log(error)
  }
};