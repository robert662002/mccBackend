const express = require('express');
const router = express.Router();
const adminregisterController = require('../controllers/adminregisterController');

router.post('/', adminregisterController.handleNewAdmin);

module.exports = router;