const Company = require('../model/Company');

const getAllCompanies = async (req, res) => {
    const companies = await Company.find();
    if (!companies) return res.status(204).json({ 'message': 'No companies found.' });
    res.json(companies);
}

const createNewCompany = async (req, res) => {
  const { companyName,testerName,skills,cutoffMark,intro,eligibility,reflink } = req.body;
  if(!companyName ) return res.status(400).json({ 'message': 'company name is  required.' });


  try {
    const createdCompany = await Company.create({ companyName,testerName,skills,cutoffMark,intro,eligibility,reflink});
    res.status(201).json(createdCompany); // Return the created company as the response
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create company' });
  }
};


const updateCompany = async(req,res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const company = await Company.findOne({ _id: req.body.id }).exec();
    if (!company) {
        return res.status(204).json({ "message": `No company matches ID ${req.body.id}.` });
    }
    if (req.body?.companytext) company.companyText = req.body.companytext;
    const result = await company.save();
    res.json(result);
}

const deleteCompany = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Company ID required.' });
    console.log(req.body)

    const company = await Company.findOne({ _id: req.body.id }).exec();
    if (!company) {
        return res.status(204).json({ "message": `No company matches ID ${req.body.id}.` });
    }
    const result = await company.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getCompany = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Company ID required.' });

    const company = await Company.findOne({ _id: req.params.id }).exec();
    if (!company) {
        return res.status(204).json({ "message": `No company matches ID ${req.params.id}.` });
    }
    res.json(company);
    console.log(company)
}

module.exports = {
    getAllCompanies,
    createNewCompany,
    updateCompany,
    deleteCompany,
    getCompany
}