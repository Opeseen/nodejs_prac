import '@babel/polyfill';
import {getAllJobs, updateInvoice, createInvoice} from './processData';


const modifyInvoice = document.querySelector('.modify-resource');
const postInvoice = document.querySelector('.create-resource');
const job = document.querySelector('.jobs');


if(job){
  const defaultDropdownValue = job.value;
  getAllJobs().then(
    data => (
      data.forEach( (jobs) => {
        const addElement = document.createElement("option");
        if(jobs.id !== defaultDropdownValue){
          addElement.value = jobs.id.trim()
          addElement.text = jobs.jobID + " - " + jobs.jobDescription
          job.add(addElement)
        }

      })
    )
  )
};

if(postInvoice)
  postInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const invoiceNo = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const salesval = document.getElementById('salesval').value;
    const costval = document.getElementById('costval').value;
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

