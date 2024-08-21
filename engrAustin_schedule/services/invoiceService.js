const {Invoice} = require('../models');
const APIFeatures = require('../utils/ApiFeatures');

const createInvoice = async(invoiceDetails) =>{
  const newInvoice = await Invoice.create(invoiceDetails);
  return newInvoice;
};

const getInvoicebyId = async(invoiceId) => {
  const invoice = await Invoice.findById(invoiceId)
    .populate({
      path: 'payment job',
      select: {
        paymentRefId: 0
      }
    });
  return invoice;
};

const findOneInvoice = async(slug) =>{
  const invoice = await Invoice.findOne({slug})
    .populate({
      path: 'payment job',
      select: {
        paymentRefId: 0
      }
    });
  return invoice;
};

const getAllInvoices = async(queryObject) => {
  const requestQuery = {...queryObject};

  // EXECUTE QUERY...
  const features = new APIFeatures(Invoice.find(),requestQuery)
    .filter()
    .sort()
    .limitFields()
  const invoice = await features.query;
  // EXECUTE QUERY FOR COUNT...
  const docCount = new APIFeatures(Invoice.find()).count();
  const docCounted = await docCount.query;
  
  return {invoice, docCounted}
};

const updateInvoice = async(invoiceId, updatedDetails) => {
  const invoice = await Invoice.findByIdAndUpdate(invoiceId, updatedDetails, {new: true, runValidators: true});
  return invoice;
};

const deleteInvoice = async(invoiceId) => {
  const invoice = await Invoice.findByIdAndDelete(invoiceId);
  return invoice;
};

const addPaymentToInvoice = async(invoiceId, PaymentId, paymentStatus) => {
  await Invoice.findByIdAndUpdate(invoiceId, 
    { 
      $addToSet: {payment: PaymentId},
      $set: {invoicePaymentStatus: paymentStatus}
      
    },  
    { new: true, runValidators: true }
  );
};

const removePaymentFromInvoice = async(invoiceId, PaymentId) => {
  await Invoice.findByIdAndUpdate(invoiceId,
    {
      $pull: {payment: PaymentId},
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
  addPaymentToInvoice,
  removePaymentFromInvoice
};
