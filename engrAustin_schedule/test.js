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


// const testing = catchAsyncError(async(req, res) => {
//   const id = req.params.id;

//   const job = await Invoice.find({jobID: ObjectId(id)});
//   res.status(httpStatus.OK).json({
//     status: 'Success',
//     data: job
//   });
// });


// const {randomUUID} = require('crypto');

// console.log(randomUUID())

// {
//   paymentDetails: 'PAYMENT TO ENGR AUSTIN',
//   paymentTag: 'n-153',
//   paymentAmount: 300000,
//   invoices: [ '1234', 'abcg', 'test' ],
//   paymentDate: '2024-04-25',
//   paymentId: 'e7472ce9-d518-456b-9d21-59ebcc776dde'
// }

const data = {
  invoices: [ '1234', 'abcg', 'test' ]
  // invoices: []
};


console.log(data.invoices.length);
data.invoices.forEach(element => {
  console.log(element);
});


db.collection_name.aggregate({
  "$match": {
      "complist": {
          "$elemMatch": {
              "a": "a"
          }
      }
  }
});


// {
//   $match: {
//     paymentReferenceId: {
//       $elemMatch: {"paymentReferenceId": ObjectId("66411c73088cc51ed8df5595")}
//     }
//   }
// }