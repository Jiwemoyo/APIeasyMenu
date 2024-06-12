const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, checkValidation } = require('../utils/validation');

router.post('/register', validateRegister, checkValidation, authController.register);
router.post('/login', validateLogin, checkValidation, authController.login);

module.exports = router;
