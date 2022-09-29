const express = require('express');
const router = express.Router();
const {
  addTrip,
  getAllTripsOfGroup,
  addMember,
  removeMember,
  getSingleTrip,
} = require('../controllers/tripController');

router.get('/:group', getAllTripsOfGroup);
router.get('/single/:trip', getSingleTrip);

router.post('/add', addTrip);

router.patch('/add/member', addMember);
router.patch('/remove/member', removeMember);

module.exports = router;
