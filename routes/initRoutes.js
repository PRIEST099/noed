const express = require('express');
const initializeController = require('../controllers/initController');
const tokenConfirmationController = require('../controllers/tokenConfirmationController');
const secretController = require('../controllers/SecretController')

const router = express.Router();

// route for initialization
router.get('/init', initializeController.initialize);

router.post('/confirm-token', tokenConfirmationController.confirmToken);



module.exports = router;
