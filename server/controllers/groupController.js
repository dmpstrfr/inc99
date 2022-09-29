const { default: mongoose } = require('mongoose');
const Group = require('../models/groupModel');
const Inventory = require('../models/inventoryModel');

// @desc    Adds a new group
// @route   POST /api/groups/add
// @access  Public
const addGroup = async (req, res) => {
  const { name, members, owner } = req.body;
  try {
    await Group.create({ name, members, owner });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Gets a single group
// @route   GET /api/groups/:group
// @access  Public
const getSingleGroup = async (req, res) => {
  const { group } = req.params;
  try {
    Group.findOne({ _id: group })
      .populate('owner')
      .populate('members')
      .exec((err, group) => {
        if (err) res.status(400).json(err);
        else res.status(200).json(group);
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Gets all groups
// @route   GET /api/groups/all/:user
// @access  Public
const getAllUserGroups = async (req, res) => {
  const { user } = req.params;
  try {
    Group.find({ owner: mongoose.Types.ObjectId(user) })
      .populate('owner')
      .populate('members')
      .exec((err, userGroups) => {
        Group.find({
          members: mongoose.Types.ObjectId(user),
          owner: { $ne: mongoose.Types.ObjectId(user) },
        })
          .populate('owner')
          .populate('members')
          .exec((err, addedGroups) => {
            console.log(addedGroups);
            if (err) res.status(400).json(err);
            else res.status(200).json([...userGroups, ...addedGroups]);
          });
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Removes a group member and unlinks inventory
// @route   PATCH /api/groups/remove/member
// @access  Public
const removeMember = async (req, res) => {
  const { user, group } = req.body;
  try {
    Group.findOneAndUpdate(
      { group: group },
      { $pull: { members: mongoose.Types.ObjectId(user) } }
    ).exec((err, updatedGroup) => {
      Inventory.updateMany(
        {
          owner: mongoose.Types.ObjectId(user),
        },
        { $pull: { sharedWith: group } }
      ).exec((err, updatedInventory) => {
        if (err) res.status(400).json(err);
        else res.sendStatus(200);
      });
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Adds a member to the group
// @route   PATCH /api/groups/add/member
// @access  Public
const addMember = async (req, res) => {
  const { user, group } = req.body;
  try {
    Group.findOneAndUpdate(
      { group: group },
      { $push: { members: mongoose.Types.ObjectId(user) } }
    ).exec((err, updatedGroup) => {
      if (err) res.status(400).json(err);
      else res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  addGroup,
  getAllUserGroups,
  getSingleGroup,
  removeMember,
  addMember,
};
