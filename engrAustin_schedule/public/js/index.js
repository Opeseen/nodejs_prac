import '@babel/polyfill';
import {
  getAllJobs, createJob, updateJob, deleteJob, 
  getUnpaidInvoices, createInvoice, updateInvoice, deleteInvoice, 
  unlinkResource, updatePayment, deletePayment,createPayment
} 
from './processData';

// INVOICES
const modifyInvoice = document.querySelector('.modify-resource-invoice');
const removeInvoice = document.querySelector('.delete-resource-invoice');
const postInvoice = document.querySelector('.create-resource-invoice');

// PAYMENTS
const modifyPayment = document.querySelector('.modify-resource-payment');
const removePayment = document.querySelector('.delete-resource-payment');
const postPayment = document.querySelector('.create-resource-payment');

// JOBS 
const job = document.querySelector('.jobs');
const postJob = document.querySelector('.create-resource-job');
const modifyJob = document.querySelector('.modify-resource-job');
const removeJob = document.querySelector('.delete-resource-job')


// JOBS
if(job){
  const defaultDropdownValue = job.value;
  getAllJobs().then(
    (data) => {
      if (data !== undefined){
        data.forEach( (jobs) => {
          const addElement = document.createElement("option");
          if(jobs.id !== defaultDropdownValue){
            addElement.value = jobs.id.trim()
            addElement.text = jobs.jobID + " - " + jobs.description
            job.add(addElement)
          }
        })
      }
    }
  )
};

if (postJob){
  postJob.addEventListener('submit', event => {
    event.preventDefault();
    const jobid = document.getElementById('jobid').value;
    const description = document.getElementById('desc').value;
    const jobtype = document.getElementById('jobtype').value;
    const jobpo = document.getElementById('podoc').value;

    createJob(jobid,jobtype,description,jobpo);
  });
};

if(modifyJob){
  modifyJob.addEventListener('submit', event => {
    event.preventDefault();
    const jobid = document.getElementById('jobid').value;
    const description = document.getElementById('desc').value;
    const po = document.getElementById('podoc').value;
    const type = document.getElementById('jobtype').value;
    const id = document.getElementById('docid').value;
    
    updateJob(id,jobid,type,description,po);
  });
};

if (removeJob){
  removeJob.addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('docid').value

    deleteJob(id);
  });
};


// INVOICES

if(postInvoice){
  postInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const invoiceNo = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const salesval = document.getElementById('salesval').value;
    const costval = document.getElementById('costval').value || 0;
    const job = document.getElementById('job').value;
    const invclass = document.getElementById('invclass').value;
    const whtpercent = document.getElementById('whtpercent').value;

    createInvoice(invoiceNo,description,salesval,costval,job,invclass,whtpercent);
  });

};

if (modifyInvoice){
  modifyInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const invoiceNo = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const salesval = document.getElementById('salesval').value;
    const costval = document.getElementById('costval').value;
    const job = document.getElementById('job').value;
    const invclass = document.getElementById('invclass').value;
    const whtpercent = document.getElementById('whtpercent').value;
    const docid = document.getElementById('docid').value

    updateInvoice(docid,invoiceNo,description,salesval,costval,job,invclass,whtpercent);
  });
};

if (removeInvoice){
  removeInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const docid = document.getElementById('docid').value

    deleteInvoice(docid);
  });
};

// PAYMENTS

if (postPayment){
  // SECTION 1
  const invoiceSelection = document.querySelector('.invoice-field-item');
  if (invoiceSelection){
    // LOAD ALL UNPAID INVOICES
    getUnpaidInvoices().then(
      (data) => {
        if(data !== undefined){
          let x = 0;
          data.forEach((element) => {
            x++
            // CREATE HTML TAG FOR "LI" & "LABEL"
            const create_div_tag = document.createElement('div');
            create_div_tag.classList.add('form-check');
            create_div_tag.innerHTML = `<label class="form-check-label" for="inv-${x}"><input type="checkbox" class="form-check-input" name="invoice" id="inv-${x}" value="${element.id}">${element.invoiceNumber} - ${element.description}</label>`
            invoiceSelection.appendChild(create_div_tag);
          });
        };
      }
    )
  };

  // SECTION 2
  postPayment.addEventListener('submit', event => {
    event.preventDefault();
    const tag = document.getElementById('paytag').value;
    const description = document.getElementById('paydesc').value;
    const amount = document.getElementById('payamount').value;
    const date = document.getElementById('date').value;

    // PROCESS DATA FOR ANY INVOICE TO BE ATTACHED
    let checkboxes = document.querySelectorAll('input[name="invoice"]:checked');
    let checkedInvoiceValues = [];
    checkboxes.forEach((checkbox) => {
      checkedInvoiceValues.push(checkbox.value);
    });

    createPayment(tag,description,amount,date,checkedInvoiceValues);
  });
};

if (modifyPayment){
  // SECTION 1
  const invoiceSelection = document.querySelector('.invoice-field-item');
  if (invoiceSelection){
    // LOAD ALL UNPAID INVOICES
    getUnpaidInvoices().then(
      (data) => {
        if(data !== undefined){
          let x = 0;
          data.forEach((element) => {
            x++
            // CREATE HTML TAG FOR "LI" & "LABEL"
            const create_div_tag = document.createElement('div');
            create_div_tag.classList.add('form-check');
            create_div_tag.innerHTML = `<label class="form-check-label" for="inv-${x}"><input type="checkbox" class="form-check-input" name="invoice" id="inv-${x}" value="${element.id}">${element.invoiceNumber} - ${element.description}</label>`
            invoiceSelection.appendChild(create_div_tag);
          });
        };
      }
    )
  };
  // SECTION 2
  modifyPayment.addEventListener('submit', event =>{
    event.preventDefault();
    // GET THE VALUE OF DATA UPDATED
    const tag = document.getElementById('tag').value;
    const description = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const docid = document.getElementById('docid').value
    // PROCESS DATA FOR ANY INVOICE TO BE ATTACHED
    let checkboxes = document.querySelectorAll('input[name="invoice"]:checked');
    let checkedInvoiceValues = [];
    checkboxes.forEach((checkbox) => {
      checkedInvoiceValues.push(checkbox.value);
    });

    // UPDATE THE PAYMENT
    updatePayment(docid, tag, description, amount, date, checkedInvoiceValues);
  });

  // SECTION 3
  const unlinkInvoice = document.querySelectorAll('.unlink');
  if (unlinkInvoice){
    const payid = document.getElementById('docid').value
    let invoice_id = null
    for (let i = 0; i < unlinkInvoice.length; i++) {
      unlinkInvoice[i].addEventListener("click", function(event) {
        invoice_id = event.target.lastChild.innerText
        unlinkResource(invoice_id,payid);
      });
    };
  }
}

if (removePayment){
  removePayment.addEventListener('submit', event => {
    event.preventDefault();
    const docid = document.getElementById('docid').value

    deletePayment(docid);
  });
};
