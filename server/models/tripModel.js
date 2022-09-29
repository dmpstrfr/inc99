const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  meetingPlace: {
    type: String,
    required: false,
  },
  meetingTime: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  shelter: {
    type: Boolean,
    required: false,
  },
  food: {
    type: Boolean,
    required: false,
  },
  ron: {
    type: String,
    required: false,
  },
  distance: {
    type: String,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
