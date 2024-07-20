import '@babel/polyfill';
import {getAllJobs, getUnpaidInvoices, createInvoice, updateInvoice, deleteInvoice, updatePayment} from './processData';


// INVOICES
const modifyInvoice = document.querySelector('.modify-resource-invoice');
const removeInvoice = document.querySelector('.delete-resource-invoice');
const postInvoice = document.querySelector('.create-resource-invoice');

// PAYMENTS
const modifyPayment = document.querySelector('.modify-resource-payment');

// OTHERS 
const job = document.querySelector('.jobs');


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
            addElement.text = jobs.jobID + " - " + jobs.jobDescription
            job.add(addElement)
          }
        })
      }
    }
  )
};

// INVOICES
if(postInvoice)
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

if (modifyInvoice)
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

if (removeInvoice)
  removeInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const docid = document.getElementById('docid').value

    deleteInvoice(docid);
});

// PAYMENTS
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
            const create_li_tag = document.createElement('li');
            create_li_tag.innerHTML = `<label for="inv-${x}"><input type="checkbox" name="invoice" id="inv-${x}" value="${element.id}">${element.invoiceNumber} - ${element.description}</label>`
            invoiceSelection.appendChild(create_li_tag);
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

    updatePayment(docid, tag, description, amount, date, checkedInvoiceValues);
  });
}
