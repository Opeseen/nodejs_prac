import '@babel/polyfill';
import {
  getAllJobs, createJob, updateJob, deleteJob, 
  getUnpaidInvoices, createInvoice, updateInvoice, deleteInvoice, 
  unlinkResource, updatePayment, getPaymentLedger, deletePayment,
  createPayment, createNewUser, loginUser, logoutUser
} 
from './processData';

// GLOBAL VARIABLE
const bootbox_cta_fsize = 'fs-4'

// INVOICES
const modifyInvoice = document.querySelector('.modify-resource-invoice');
const removeInvoice = document.querySelector('.delete-resource-invoice');
const postInvoice = document.querySelector('.create-resource-invoice');
const paymentStatus = document.querySelector('.paystatus');

// PAYMENTS
const modifyPayment = document.querySelector('.modify-resource-payment');
const removePayment = document.querySelector('.delete-resource-payment');
const postPayment = document.querySelector('.create-resource-payment');

// JOBS 
const job = document.querySelector('.jobs');
const postJob = document.querySelector('.create-resource-job');
const modifyJob = document.querySelector('.modify-resource-job');
const removeJob = document.querySelector('.delete-resource-job')

// USERS
const createNewUserRecord = document.querySelector('.form--signup');
const loginUserDetails = document.querySelector('.form--login');
const logUserOut = document.querySelector('.logout');

// JOBS
if(job){
  const currentDropdownValue = job.value;
  getAllJobs().then(
    (data) => {
      if (data !== undefined){
        data.forEach( (jobs) => {
          const addElement = document.createElement("option");
          if(jobs.id !== currentDropdownValue){
            addElement.value = jobs.id.trim()
            addElement.text = jobs.jobID + " - " + jobs.description
            job.add(addElement);
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
  const id = document.getElementById('docid').value
  removeJob.addEventListener('submit', event => {
    event.preventDefault();
  });
  // Jquery function to pop up confirmation before deletion
  $(function(){
    $("#jobdelete").click(function () {
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
        callback: function (result) {
          if(result){
            deleteJob(id);
          };
        }
      });
    });

  });

};


// INVOICES

if(postInvoice){
  postInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const invoiceNo = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const salesval = Number(document.getElementById('salesval').value.replace(/,/g, ''));
    const costval = Number(document.getElementById('costval').value.replace(/,/g, '') || 0);
    const job = document.getElementById('job').value;
    const invclass = document.getElementById('invclass').value;
    const whtpercent = document.getElementById('whtpercent').value;

    createInvoice(invoiceNo,description,salesval,costval,job,invclass,whtpercent);
  });

};

if (modifyInvoice){
  // Append other payment status to the drop down list
  if(paymentStatus){
    const currentStatus = paymentStatus.value;
    ['Paid','Unpaid','Partially Paid'].forEach( paystatus => {
      const addElement = document.createElement("option");
      if(paystatus !== currentStatus){
        addElement.text = paystatus;
        paymentStatus.add(addElement);
      }
    })
  }
  // Process data for submission
  modifyInvoice.addEventListener('submit', event => {
    event.preventDefault();
    const invoiceNo = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const salesval = Number(document.getElementById('salesval').value.replace(/,/g, ''));
    const costval = Number(document.getElementById('costval').value.replace(/,/g, ''));
    const job = document.getElementById('job').value;
    const invclass = document.getElementById('invclass').value;
    const invstatus = document.getElementById('invstatus').value;
    const whtpercent = document.getElementById('whtpercent').value;
    const docid = document.getElementById('docid').value

    updateInvoice(docid,invoiceNo,description,salesval,costval,job,invclass,whtpercent,invstatus);
  });
};

if (removeInvoice){
  const docid = document.getElementById('docid').value
  removeInvoice.addEventListener('submit', event => {
    event.preventDefault();
  });
  // Jquery function to pop up confirmation before deletion
  $(function(){
    $("#invdelete").click(function () {
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
        callback: function (result) {
          if(result){
            deleteInvoice(docid);
          };
        }
      });
    });

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
            create_div_tag.innerHTML = `<label class="form-check-label flabel" for="inv-${x}"><input type="radio" class="form-check-input" name="invoice" id="inv-${x}" value="${element.id}">${element.invoiceNumber} - ${element.description}</label>`
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
    const amount = Number(document.getElementById('payamount').value.replace(/,/g, ''));
    const date = document.getElementById('date').value;
    const invStatus = document.getElementById('invstatus').value;

    // PROCESS DATA FOR ANY INVOICE TO BE ATTACHED
    let checkboxes = document.querySelectorAll('input[name="invoice"]:checked');
    let checkedInvoiceValues = [];
    checkboxes.forEach((checkbox) => {
      checkedInvoiceValues.push(checkbox.value);
    });
    createPayment(tag,description,amount,date,checkedInvoiceValues,invStatus);
  });
};

if (modifyPayment){  
  // SECTION 1
  // This will display all invoices except paid
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
            create_div_tag.innerHTML = `<label class="form-check-label flabel" for="inv-${x}"><input type="radio" class="form-check-input" name="invoice" id="inv-${x}" value="${element.id}">${element.invoiceNumber} - ${element.description}</label>`
            invoiceSelection.appendChild(create_div_tag);
          });
        };
      }
    )
  };
  // SECTION 2
  // This will update the payment data
  modifyPayment.addEventListener('submit', event =>{
    event.preventDefault();
    // GET THE VALUE OF DATA UPDATED
    const tag = document.getElementById('tag').value;
    const description = document.getElementById('desc').value;
    const amount = Number(document.getElementById('amount').value.replace(/,/g, ''));
    const date = document.getElementById('date').value;
    const invStatus = document.getElementById('invstatus').value;
    const docid = document.getElementById('docid').value
    // PROCESS DATA FOR ANY INVOICE TO BE ATTACHED
    let checkditem = document.querySelectorAll('input[name="invoice"]:checked');
    let checkedInvoiceValues = [];
    checkditem.forEach((item) => {
      checkedInvoiceValues.push(item.value);
    });
    // UPDATE THE PAYMENT
    updatePayment(docid, tag, description, amount, date, checkedInvoiceValues,invStatus);
  });

  // SECTION 3
  // Ths will removed attached invoice to a particular payment
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
  const docid = document.getElementById('docid').value
  removePayment.addEventListener('submit', event => {
    event.preventDefault();
  });
  // Jquery function to pop up confirmation before deletion
  $(function(){
    $("#paydelete").click(function () {
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
        callback: function (result) {
          if(result){
            deletePayment(docid);
          };
        }
      });
    });

  });

};


// USER
if(createNewUserRecord){
  createNewUserRecord.addEventListener('submit', event => {
    event.preventDefault();
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('passwd1').value;
    const password2 = document.getElementById('passwd2').value;

    createNewUser(firstname,lastname,email,username,password1,password2);
  });
};

if(loginUserDetails){
  loginUserDetails.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('passwd').value;
    
    loginUser(username,password);
  });
};


if(logUserOut){
  logUserOut.addEventListener('click', logoutUser)
};
