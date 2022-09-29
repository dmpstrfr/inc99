const { default: mongoose } = require('mongoose');
const Trip = require('../models/tripModel');

// @desc    Gets all trips of a group
// @route   GET /api/trips/:group
// @access  Public
const getAllTripsOfGroup = async (req, res) => {
  const { group } = req.params;
  try {
    Trip.find({ group: group })
      .populate('createdBy')
      .populate('members')
      .exec((err, trips) => {
        if (err) res.status(400).json(err);
        else res.status(200).json(trips);
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Gets a single trip
// @route   GET /api/trips/single/:trip
// @access  Public
const getSingleTrip = async (req, res) => {
  const { trip } = req.params;
  try {
    Trip.findOne({ _id: trip })
      .populate('createdBy')
      .populate('members')
      .exec((err, trip) => {
        if (err) res.status(400).json(err);
        else res.status(200).json(trip);
      });
  } catch (err) {
    res.sendStatus(500);
  }
};

// @desc    Adds a new trip
// @route   POST /api/trips/add
// @access  Public
const addTrip = async (req, res) => {
  try {
    await Trip.create({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      meetingPlace: req.body?.meetingPlace,
      meetingTime: req.body?.meetingTime,
      cost: req.body?.cost,
      distance: req.body?.distance,
      ron: req.body?.ron,
      shelter: req.body?.shelter === 'true',
      food: req.body?.food === 'true',
      createdBy: req.body?.createdBy,
      group: req.body?.group,
      members: [req.body?.createdBy],
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// @desc    Adds a new member to a trip
// @route   PATCH /api/trips/add/member
// @access  Public
const addMember = async (req, res) => {
  const { trip, user } = req.body;
  try {
    await Trip.findOneAndUpdate(
      {
        _id: trip,
      },
      { $push: { members: mongoose.Types.ObjectId(user) } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// @desc    Removes a member from a trip
// @route   PATCH /api/trips/remove/member
// @access  Public
const removeMember = async (req, res) => {
  const { trip, user } = req.body;
  try {
    await Trip.findOneAndUpdate(
      {
        _id: trip,
      },
      { $pull: { members: mongoose.Types.ObjectId(user) } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  addTrip,
  getAllTripsOfGroup,
  getSingleTrip,
  addMember,
  removeMember,
};
