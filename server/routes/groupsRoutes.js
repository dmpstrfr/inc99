const express = require('express');
const router = express.Router();
const {
  addGroup,
  getAllUserGroups,
  getSingleGroup,
  removeMember,
  addMember,
} = require('../controllers/groupController');

router.get('/all/:user', getAllUserGroups);
router.get('/:group', getSingleGroup);

router.post('/add', addGroup);

router.patch('/remove/member', removeMember);
router.patch('/add/member', addMember);

module.exports = router;
