const {Invoice} = require('../models');

const createInvoice = async(invoiceDetails) =>{
  const newInvoice = await Invoice.create(invoiceDetails);
  return newInvoice;
};

const getInvoice = async(invoiceId) => {
  const invoice = await Invoice.findById(invoiceId)
    .populate({
      path: 'paymentReferenceId',
      select: {
        _id: 0,
        paymentId: 0
      }
    });
  return invoice;
};

const getAllInvoices = async() => {
  const invoices = await Invoice.find();
  return invoices;
};

const updateInvoice = async(invoiceId, updatedDetails) => {
  const invoice = await Invoice.findByIdAndUpdate(invoiceId, updatedDetails, {new: true, runValidators: true});
  return invoice;
};

const deleteInvoice = async(invoiceId) => {
  const invoice = await Invoice.findByIdAndDelete(invoiceId);
  return invoice;
};

const addPaymentIdToInvoice = async(invoiceId, paymentId) => {
  await Invoice.findByIdAndUpdate(invoiceId, 
    { 
      $addToSet: {paymentReferenceId: paymentId},
      $set: {invoicePaymentStatus: "Paid"}
    },  
    { new: true, runValidators: true }
  );
};



module.exports = {
  createInvoice,
  getInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  addPaymentIdToInvoice
};
