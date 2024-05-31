const {Invoice} = require('../models');

const createInvoice = async(invoiceDetails) =>{
  const newInvoice = await Invoice.create(invoiceDetails);
  return newInvoice;
};

const getInvoicebyId = async(invoiceId) => {
  const invoice = await Invoice.findById(invoiceId)
    .populate({
      path: 'paymentId job',
      select: {
        paymentRefId: 0
      }
    });
  return invoice;
};

const findOneInvoice = async(slug) =>{
  const invoice = await Invoice.findOne({slug})
    .populate({
      path: 'paymentId job',
      select: {
        paymentRefId: 0
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

const addPaymentIdToInvoice = async(invoiceId, PaymentId) => {
  await Invoice.findByIdAndUpdate(invoiceId, 
    { 
      $addToSet: {paymentId: PaymentId},
      $set: {invoicePaymentStatus: "Paid"}
    },  
    { new: true, runValidators: true }
  );
};

const removePaymentIdFromInvoice = async(invoiceId, PaymentId) => {
  await Invoice.findByIdAndUpdate(invoiceId,
    {
      $pull: {paymentId: PaymentId},
      $set: {invoicePaymentStatus: "Unpaid"}
    },
    { new: true, runValidators: true }
  );
};



module.exports = {
  createInvoice,
  getInvoicebyId,
  findOneInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  addPaymentIdToInvoice,
  removePaymentIdFromInvoice
};
