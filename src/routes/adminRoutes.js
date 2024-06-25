const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

router.post('/users', authenticateToken, authorizeAdmin, adminController.createUser);
router.get('/users', authenticateToken, authorizeAdmin, adminController.getUsers);
router.get('/users/:id', authenticateToken, authorizeAdmin, adminController.getUserById);
router.put('/users/:id', authenticateToken, authorizeAdmin, adminController.updateUser);
router.delete('/users/:userId', authenticateToken, authorizeAdmin, adminController.deleteUser);

module.exports = router;
