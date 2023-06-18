const Coding = require('../model/Coding');

const getAllCodingcoding = async (req, res) => {
    const coding = await Coding.find();
    if (!coding) return res.status(204).json({ 'message': 'No coding found.' });
    res.json(coding);
}

const createNewCoding = async (req, res) => {
  const { codingName,reflink } = req.body;
  if(!codingName ) return res.status(400).json({ 'message': 'coding name is  required.' });


  try {
    const createdCoding = await Coding.create({ codingName,reflink});
    res.status(201).json(createdCoding); // Return the created coding as the response
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create coding' });
  }
};


const updateCoding = async(req,res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const coding = await Coding.findOne({ _id: req.body.id }).exec();
    if (!coding) {
        return res.status(204).json({ "message": `No coding matches ID ${req.body.id}.` });
    }
    if (req.body?.codingtext) coding.codingText = req.body.codingtext;
    const result = await coding.save();
    res.json(result);
}

const deleteCoding = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Coding ID required.' });
    console.log(req.body)

    const coding = await Coding.findOne({ _id: req.body.id }).exec();
    if (!coding) {
        return res.status(204).json({ "message": `No coding matches ID ${req.body.id}.` });
    }
    const result = await coding.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getCoding = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Coding ID required.' });

    const coding = await Coding.findOne({ _id: req.params.id }).exec();
    if (!coding) {
        return res.status(204).json({ "message": `No coding matches ID ${req.params.id}.` });
    }
    res.json(coding);
    console.log(coding)
}

module.exports = {
    getAllCodingcoding,
    createNewCoding,
    updateCoding,
    deleteCoding,
    getCoding
}