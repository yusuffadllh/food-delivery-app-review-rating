const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrderHistory
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/history/:userId', getOrderHistory);

module.exports = router;