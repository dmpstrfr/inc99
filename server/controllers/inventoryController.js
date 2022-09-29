const Inventory = require('../models/inventoryModel');
const { default: mongoose } = require('mongoose');
const Trip = require('../models/tripModel');

// // @desc    Gets a users inventory
// // @route   POST /api/inventories/add
// // @access  Public
const addInventory = async (req, res) => {
  const { user, name, categories } = req.body;
  await Inventory.create(
    {
      name: name,
      owner: mongoose.Types.ObjectId(user),
      access: 'PRIVATE',
      nodedCategories: categories,
    },
    (err, newInventory) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(newInventory);
    }
  );
};

// @desc    Gets a single inventory
// @route   GET /api/inventories/:inventory
// @access  Public
const getSingleInventory = async (req, res) => {
  const { inventory } = req.params;
  await Inventory.findOne({
    _id: inventory,
  })
    .populate('owner')
    .populate('items.item')
    .populate('sharedWith')
    .exec((err, inventory) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(inventory);
    });
};

// @desc    Gets all inventories of user
// @route   GET /api/inventories/all/:user
// @access  Public
const getInventoriesOfUser = async (req, res) => {
  const { user } = req.params;
  await Inventory.find({
    owner: user,
  }).exec((err, inventories) => {
    if (err) res.status(400).json(err);
    else res.status(200).json(inventories);
  });
};

// @desc    Gets all Public inventories
// @route   GET /api/inventories/joint-inventory/:group
// @access  Public
const getJointInventory = async (req, res) => {
  const { group } = req.params;
  await Inventory.find({
    sharedWith: group,
  })
    .populate('owner')
    .populate('items.item')
    .populate('sharedWith')
    .exec((err, inventories) => {
      if (err) res.status(400).json(err);
      else {
        let inventoryItems = [];
        for (let inventory of inventories) {
          for (let item of inventory?.items) {
            let found = false;
            for (let addedItem of inventoryItems) {
              if (addedItem?.item?._id === item?.item?._id) {
                addedItem.quantity += item.quantity;
                found = true;
              }
            }
            if (!found) inventoryItems.push(item);
          }
        }
        res.status(200).json(inventoryItems);
      }
    });
};

// @desc    Gets the joint inventory of a trip
// @route   GET /api/inventories/trip-inventory/:trip
// @access  Public
const getTripInventory = async (req, res) => {
  const { group, trip } = req.params;
  await Trip.findOne({
    _id: trip,
  }).exec(async (err, singleTrip) => {
    if (err) res.status(400).json(err);
    else {
      await Inventory.find({
        sharedWith: singleTrip.group,
        owner: { $in: singleTrip.members },
      })
        .populate('owner')
        .populate('items.item')
        .populate('sharedWith')
        .exec((err, inventories) => {
          if (err) res.status(400).json(err);
          else {
            let inventoryItems = [];
            for (let inventory of inventories) {
              for (let item of inventory?.items) {
                let found = false;
                for (let addedItem of inventoryItems) {
                  if (addedItem?.item?._id === item?.item?._id) {
                    addedItem.quantity += item.quantity;
                    found = true;
                  }
                }
                if (!found) inventoryItems.push(item);
              }
            }
            res.status(200).json(inventoryItems);
          }
        });
    }
  });
};

// @desc    Gets the joint inventory of a group
// @route   GET /api/inventories/all/public
// @access  Public
const getAllPublicInventories = async (req, res) => {
  await Inventory.find({
    access: 'PUBLIC',
  })
    .populate('owner')
    .populate('items.item')
    .exec((err, inventories) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(inventories);
    });
};

// // @desc    Adds item(s) to an inventory
// // @route   POST /api/inventories/add/item
// // @access  Public
const addItemToInventory = async (req, res) => {
  const { item, inventory } = req.body;
  Inventory.findOneAndUpdate(
    { _id: inventory },
    {
      $push: {
        items: {
          item: item,
          quantity: 1,
        },
      },
    },
    (err, updatedInventory) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(updatedInventory);
    }
  );
};

// // @desc    Adds item(s) to an inventory
// // @route   PATCH /api/inventories/:inventory
// // @access  Public
const updateInventory = async (req, res) => {
  const { inventory } = req.params;
  await Inventory.findOneAndUpdate(
    {
      _id: inventory,
    },
    req.body,
    (err, updatedInventory) => {
      if (err) res.status(400).json(err);
      else res.status(200).json(updatedInventory);
    }
  ).clone();
};

// @desc    Updates quantity of item in inventory
// @route   PATCH /api/inventories/update/item
// @access  Public
const updateItemInInventory = async (req, res) => {
  const { inventory, items } = req.body;
  try {
    for (let item of items) {
      await Inventory.findOneAndUpdate(
        {
          _id: inventory,
        },
        { $set: { 'items.$[el].quantity': item?.quantity } },
        {
          arrayFilters: [{ 'el.item': item?._id }],
          new: true,
        }
      );
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Updates link of item in inventory
// @route   PATCH /api/inventories/update/item-link
// @access  Public
const updateItemLinkInInventory = async (req, res) => {
  const { inventory, itemId, itemLink } = req.body;
  try {
    await Inventory.findOneAndUpdate(
      {
        _id: inventory,
      },
      { $set: { 'items.$[el].itemLink': itemLink } },
      {
        arrayFilters: [{ 'el.item': itemId }],
        new: true,
      }
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Removes an item from inventory
// @route   PATCH /api/inventories/remove/item
// @access  Public
const removeItemInInventory = async (req, res) => {
  const { inventory, item } = req.body;
  try {
    await Inventory.findOneAndUpdate(
      {
        _id: inventory,
      },
      { $pull: { items: { item: item } } },
      {
        arrayFilters: [{ 'el.item': item?._id }],
        new: true,
      }
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Nodes a newly created category with an inventory
// @route   PATCH /api/inventories/node/category
// @access  Public
const nodeCategoryWithInventory = async (req, res) => {
  const { inventory, category } = req.body;
  try {
    await Inventory.findOneAndUpdate(
      {
        _id: inventory,
      },
      { $push: { nodedCategories: category } }
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Nodes a group with an inventory
// @route   PATCH /api/inventories/node/group
// @access  Public
const nodeGroupWithInventory = async (req, res) => {
  const { inventory, group } = req.body;
  try {
    await Inventory.findOneAndUpdate(
      {
        _id: inventory,
      },
      { $push: { sharedWith: group } }
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getSingleInventory,
  getInventoriesOfUser,
  getJointInventory,
  getTripInventory,
  getAllPublicInventories,
  addInventory,
  addItemToInventory,
  updateInventory,
  updateItemInInventory,
  updateItemLinkInInventory,
  removeItemInInventory,
  nodeCategoryWithInventory,
  nodeGroupWithInventory,
};
