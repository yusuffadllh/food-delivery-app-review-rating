const express = require('express');
const router = express.Router();

const {
  getRestaurants,
  getRestaurantMenus
} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id/menu', getRestaurantMenus);

module.exports = router;