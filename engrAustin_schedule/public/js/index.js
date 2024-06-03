const invoiceItems = document.querySelector('.resource-details');

if (invoiceItems)
  invoiceItems.addEventListener('submit', e => {
    e.preventDefault();
    const invoice = document.getElementById('invno').value;
    const description = document.getElementById('desc').value;
    const data = document.getElementById('invclass').value;
    const job = document.getElementById('job').value;

    console.log(invoice, description, data, job)
});

