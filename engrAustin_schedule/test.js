// invoiceSchema.statics.addInvoiceToJob = async function(invoice, jobID){
//   const job = await Job.findById(jobID);
//   if(job){
//     job.invoices.addToSet(invoice);
//     await job.save();
//   };
// };

// invoiceSchema.statics.deleteInvoiceFromJob = async function(invoice,jobID){
//   const job = await Job.findById(jobID);
//   if(job){
//     job.invoices.pull(invoice);
//     await job.save();
//   };
// };

const {randomUUID} = require('crypto');

console.log(randomUUID())