const express = require('express');
const router = express.Router();
const adminauthController = require('../controllers/adminauthController');

router.post('/', adminauthController.handleLogin);

module.exports = router;