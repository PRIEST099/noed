const express = require('express');
const secretController = require('../controllers/SecretController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, secretController.getSecret);
router.post('/', authenticateToken, secretController.keepSecret);
router.delete('/', authenticateToken, secretController.deleteSecret);

module.exports = router;
