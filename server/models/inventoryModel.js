const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  access: {
    type: String,
    enum: ['PRIVATE', 'PUBLIC'],
    default: 'PRIVATE',
  },
  nodedCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: {
        type: Number,
        default: 0,
      },
      itemLink: {
        type: String,
      },
    },
  ],
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
