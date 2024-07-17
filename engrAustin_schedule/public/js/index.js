import '@babel/polyfill';
import {getAllJobs, createInvoice, updateInvoice, deleteInvoice, updatePayment} from './processData';


// INVOICES
const modifyInvoice = document.querySelector('.modify-resource-invoice');
const removeInvoice = document.querySelector('.delete-resource-invoice');
const postInvoice = document.querySelector('.create-resource-invoice');

// PAYMENTS
const modifyPayment = document.querySelector('.modify-resource-payment');
const job = document.querySelector('.jobs');

// For Testing
const testMultipleSelection = document.querySelector('.field-items');
if(testMultipleSelection){
  const name = "Opeyemi"
  console.log(true)
  const data = document.createElement('div');
  data.innerHTML = `<input type="checkbox" id="last 31 days" name="new" value="last 31 days"> <label for="last 30 days">${name}</label>`
  testMultipleSelection.appendChild(data);
}else{
  console.log(false)
}
// For Testing

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

if (modifyPayment){
  console.log(true)
  const tag = document.getElementById('tag').value;
  const description = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const docid = document.getElementById('docid').value

  updatePayment(docid, tag, description, amount, date);
}

