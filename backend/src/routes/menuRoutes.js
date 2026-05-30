const express = require('express');
const router = express.Router();

const {
  getMenus,
  getMenuById,
  getMenuByRestaurant,
  createMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menuController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.get('/restaurant/:id', getMenuByRestaurant);
router.post('/',authMiddleware,adminMiddleware,createMenu);
router.put('/:id',authMiddleware,adminMiddleware,updateMenu);
router.delete('/:id',authMiddleware,adminMiddleware,deleteMenu);

module.exports = router;