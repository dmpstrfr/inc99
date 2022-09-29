const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

router.post('/add', addCategory);
router.get('/all/:user', getAllCategories);
router.delete('/:categoryId', deleteCategory);

module.exports = router;
