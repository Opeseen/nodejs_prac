const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema();


const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;