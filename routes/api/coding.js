const express = require('express');
const router = express.Router();
const codingController = require('../../controllers/codingController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(codingController.getAllCodingcoding)
    .post( codingController.createNewCoding)
    .put( codingController.updateCoding)
    .delete( codingController.deleteCoding);

router.route('/:id')
    .get(codingController.getCoding);

module.exports = router;