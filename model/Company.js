
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    testerName: {
        type: String,
    },
    skills: {
        type: String,
    },
    cutoffMark: {
        type: Number,
    },
    intro: {
        type: String,
    },
    eligibility: {
        type: String,
    },
    reflink : {
       type: String, 
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
