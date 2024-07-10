import axios from 'axios';
import {showAlert} from './alert';

export const getAllJobs = async() => {
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v2/mundial/jobs'
    });
    if(result.data.jobs.length > 0){ return result.data.jobs };
    
  } catch (error) {
    console.log(error.response.data.message)
  }
};

export const createInvoice = 
async(invoiceNumber,description,salesValue,spentValue,job,invoiceClass,witholdingTaxPercent) => {
  try {
    const resource = await axios({
      method: 'POST',
      url:  'http://localhost:3000/api/v2/mundial/invoices',
      data: {
        invoiceNumber,
        description,
        salesValue,
        spentValue,
        job,
        invoiceClass,
        witholdingTaxPercent
      }
    });
    if(resource.data.success){
      showAlert('success','Invoice Successfully Created');
      window.setTimeout(() => {
        location.reload();
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
}

export const updateInvoice = 
async(id,invoiceNumber,description,salesValue,spentValue,job,invoiceClass,witholdingTaxPercent) => {
  try {
    const resource = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v2/mundial/invoices/${id}`,
      data: {
        invoiceNumber,
        description,
        salesValue,
        spentValue,
        job,
        invoiceClass,
        witholdingTaxPercent
      }
    });
    if(resource.data.success){
      showAlert('success','Invoice Successfully Updated');
      window.setTimeout(() => {
        location.assign('/invoices/view');
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};

export const deleteInvoice = async(id) => {
  try {
    const resource = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v2/mundial/invoices/${id}`
    })
    if(resource.status === 204){
      showAlert('success','Invoice Successfully Deleted');
      window.setTimeout(() => {
        location.assign('/invoices/view');
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
}


export const updatePayment = 
(id, tag, details, amount, date) => {
  // try {
  //   const resource = await axios({
  //     method: 'PATCH',
  //     url: `http://localhost:3000/api/v2/mundial/payments/${id}`,
  //     data: {
  //       id,
  //       tag,
  //       details,
  //       invoices
  //     }
  //   });
  //   if(resource.data.success){
  //     showAlert('success','Payment Successfully Updated');
  //     window.setTimeout(() => {
  //       location.assign('/invoices/view');
  //     },2000);
  //   }
  // } catch (error) {
  //   showAlert('error',error.response.data.message);
  // }

  console.log(id, tag, details, amount, date)
};