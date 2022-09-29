const { default: mongoose } = require('mongoose');
const Category = require('../models/categoryModel');

// @desc    Adds a new category
// @route   POST /api/categories/add
// @access  Public
const addCategory = async (req, res) => {
  const { name, user } = req.body;
  const category = await Category.create({
    name,
    createdBy: user ? mongoose.Types.ObjectId(user) : null,
  });
  res.status(201).json({
    category,
  });
};

// @desc    Adds a new category
// @route   GET /api/categories/all/:user
// @access  Public
const getAllCategories = async (req, res) => {
  const { user } = req.params;
  Category.find({})
    .or([{ createdBy: null }, { createdBy: user }])
    .exec((err, categories) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(categories);
    });
};

// @desc    Deletes a category
// @route   DELETE /api/categories/:categoryId
// @access  Public
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  await Category.findByIdAndDelete({ _id: categoryId });
  res.sendStatus(201);
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
};
