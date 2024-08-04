const express = require('express');
const { createItem, getItems } = require('../controllers/itemController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', createItem);
router.get('/getitems', getItems);

module.exports = router;
