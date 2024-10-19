const express = require('express');
const tokenConfirmationController = require('../controllers/tokenConfirmationController');
const router = express.Router();

// Confirm the API token for an application
router.post('/confirm-token', tokenConfirmationController.confirmToken);

module.exports = router;
