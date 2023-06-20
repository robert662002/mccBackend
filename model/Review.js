
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  branch:{
    type: String,
    required: true,
  },
  currentDate:{
    type: Date,
    default: Date.now,
  }


});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review


