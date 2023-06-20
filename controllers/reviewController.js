const Review = require('../model/Review');


const getAllReviews = async (req, res) => {
    const reviews = await Review.find();
    if (!reviews) return res.status(204).json({ 'message': 'No reviews found.' });
    res.json(reviews);
}
const createNewReview = async (req, res) => {
    const { studentName, reviewText ,companyName,branch} = req.body;
  
    try {
      const currentDateTime = new Date();
      const currentDate = currentDateTime.toISOString().split('T')[0];
      const createdReview = await Review.create({ currentDate,studentName, reviewText ,companyName,branch});
      res.status(201).json(createdReview); // Return the created review as the response
    } catch (error) {
        console.log('error at backend')
      res.status(500).json({ error: error.message || 'Failed to create review' });
    }
  };

const updateReview = async(req,res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const review = await Review.findOne({ _id: req.body.id }).exec();
    if (!review) {
        return res.status(204).json({ "message": `No review matches ID ${req.body.id}.` });
    }
    if (req.body?.reviewtext) review.reviewText = req.body.reviewtext;
    const result = await review.save();
    res.json(result);
}

const deleteReview = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Review ID required.' });
    console.log(req.body)

    const review = await Review.findOne({ _id: req.body.id }).exec();
    if (!review) {
        return res.status(204).json({ "message": `No review matches ID ${req.body.id}.` });
    }
    const result = await review.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getReview = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Review ID required.' });

    const review = await Review.findOne({ _id: req.params.id }).exec();
    if (!review) {
        return res.status(204).json({ "message": `No review matches ID ${req.params.id}.` });
    }
    res.json(review);
    console.log(review)
}

module.exports = {
    getAllReviews,
    createNewReview,
    updateReview,
    deleteReview,
    getReview
}