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
    console.log(error.response.data.message);
    showAlert('error',"Error Fetching Jobs");
  }
};

export const getUnpaidInvoices = async() =>{
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v2/mundial/invoices?invoicePaymentStatus=Unpaid'
    });
    if(result.data.invoices.length > 0){ return result.data.invoices };
  } catch (error) {
    console.log(error.response.data.message);
    showAlert('error',"Error Fetching Invoices");
  }
};

export const createInvoice = 
async(invoiceNumber,description,salesValue,spentValue,job,invoiceClass,witholdingTaxPercent) => {
  try {
    const response = await axios({
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
    if(response.data.success){
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
    const response = await axios({
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
    if(response.data.success){
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
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v2/mundial/invoices/${id}`
    })
    if(response.status === 204){
      showAlert('success','Invoice Successfully Deleted');
      window.setTimeout(() => {
        location.assign('/invoices/view');
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};

export const createPayment = 
async(tag, details, amount, date, invoices) => {
  try {
    const response = await axios({
      method: 'POST',
      url:  'http://localhost:3000/api/v2/mundial/payments',
      data: {
        tag,
        details,
        amount,
        date,
        invoices
      }
    });
    if(response.data.success){
      showAlert('success','Payment Successfully Created');
      window.setTimeout(() => {
        location.reload();
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};


export const updatePayment = 
async(id, tag, details, amount, date, invoices) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v2/mundial/payments/${id}`,
      data: {
        id,
        tag,
        details,
        amount,
        date,
        invoices
      }
    });
    if(response.data.success){
      showAlert('success','Payment Successfully Updated');
      window.setTimeout(() => {
        location.reload();
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }

};

export const unlinkResource = async(id,payid) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v2/mundial/invoices/${id}/payment/${payid}/unlink`,
    });
    if(response.data.success){
      showAlert('success','Invoice Successfully Unlink');
      window.setTimeout(() => {
        location.reload();
      },1000);
    }
  } catch (error) {
    console.log(error.response.data.message);
    showAlert('error',"Error Unlinking Invoice");
  }
};

export const deletePayment = async(id) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v2/mundial/payments/${id}`
    })
    if(response.status === 204){
      showAlert('success','Payment Successfully Deleted');
      window.setTimeout(() => {
        location.assign('/Payments/view');
      },2000);
    }
  } catch (error) {
    showAlert('error',error.response.data.message);
  }
};
