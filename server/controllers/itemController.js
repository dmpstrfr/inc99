const { default: mongoose } = require('mongoose');
const Item = require('../models/itemModel');

// @desc    Adds a new item
// @route   POST /api/items/add
// @access  Public
const addItem = async (req, res) => {
  const { name, emoji, category, createdBy } = req.body;
  const item = await Item.create({
    name: name,
    emoji: emoji,
    createdBy: createdBy,
    category: category,
  });
  res.status(201).json({
    item,
  });
};

// @desc    Gets all items
// @route   GET /api/items/all/:user
// @access  Public
const getAllItems = async (req, res) => {
  const { user } = req.params;
  Item.find({})
    .or([{ createdBy: null }, { createdBy: mongoose.Types.ObjectId(user) }])
    .populate('category')
    .exec((err, items) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(items);
    });
};

// @desc    Gets all items of a specific category
// @route   GET /api/items/:category/:user
// @access  Public
const getAllItemsOfCategory = async (req, res) => {
  const { category, user } = req.params;
  Item.find({
    category: category,
  })
    .or([{ createdBy: null }, { createdBy: mongoose.Types.ObjectId(user) }])
    .populate('category')
    .exec((err, items) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(items);
    });
};

module.exports = {
  addItem,
  getAllItems,
  getAllItemsOfCategory,
};
