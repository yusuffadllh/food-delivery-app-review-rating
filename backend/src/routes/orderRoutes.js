const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrderHistory,
  getOrderById,
  getActiveOrders
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/active/:userId', getActiveOrders);
router.get('/history/:userId', getOrderHistory);
router.get('/:orderId', getOrderById);


module.exports = router;