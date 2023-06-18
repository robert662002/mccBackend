const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(reviewController.getAllReviews)
    .post( reviewController.createNewReview)
    .put( reviewController.updateReview)
    .delete( reviewController.deleteReview);

router.route('/:id')
    .get(reviewController.getReview);

module.exports = router;