const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');


const router = express.Router();

// place user order
router.post('/place', authMiddleware, orderController.placeOrder);
router.post('/verify', orderController.veriyOrder);

module.exports = router;