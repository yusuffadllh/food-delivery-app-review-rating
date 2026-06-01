const express = require('express');
const router = express.Router();

const {
  createReview,
  getReviewOrder
} = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/:orderId', getReviewOrder);


module.exports = router;