const express = require('express');
const router = express.Router();
const {
  addUser,
  loginUser,
  getAllStandardUsers,
} = require('../controllers/userController');

router.post('/sign-up', addUser);
router.post('/sign-in', loginUser);
router.get('/:permission', getAllStandardUsers);

module.exports = router;
