const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const {Job, User, Invoice, Payment} = require('./models');

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch((error) => console.error(error));

// READ JSON FILE
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/data/job-data.json`, 'utf-8'));
const payments = JSON.parse(fs.readFileSync(`${__dirname}/data/payment-data.json`, 'utf-8'));
const invoices = JSON.parse(fs.readFileSync(`${__dirname}/data/invoice-data.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Job.create(jobs);
    await Payment.create(payments);
    await Invoice.create(invoices);

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Job.deleteMany();
    await Payment.deleteMany();
    await Invoice.deleteMany();

    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);