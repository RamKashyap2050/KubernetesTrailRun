const express = require('express');
const { register, login, getProfile, verifyUser, getUserById } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.get('/verify/', verifyUser);
router.get('/:id', getUserById);
module.exports = router;
