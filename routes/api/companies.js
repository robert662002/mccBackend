const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companyController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(companyController.getAllCompanies)
    .post( companyController.createNewCompany)
    .put( companyController.updateCompany)
    .delete( companyController.deleteCompany);

router.route('/:id')
    .get(companyController.getCompany);

module.exports = router;