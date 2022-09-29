const express = require('express');
const router = express.Router();
const {
  addItem,
  getAllItems,
  getAllItemsOfCategory,
} = require('../controllers/itemController');

router.post('/add', addItem);
router.get('/all/:user', getAllItems);
router.get('/:category/:user', getAllItemsOfCategory);

module.exports = router;
