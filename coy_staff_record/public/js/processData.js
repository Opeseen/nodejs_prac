import axios from 'axios';
import {showAlert} from './alert';
// EMPLOYEES SECTION
export const processUpdatedEmployeeRecord = async(id, firstname, lastname, phone, email,
  address, state, city, nationality
) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `http://localhost:8080/api/mun/v1/employee/${id}`,
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
      showAlert('success','Employee Details Successfully Updated');
      window.setTimeout(() => {
        location.reload();
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};