const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @desc    Adds a new user
// @route   POST /api/users/sign-up
// @access  Public
const addUser = async (req, res) => {
  const { name, email, password, permission } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    //user already exists with this email
    res.status(404).json({
      existingUser: true,
    });
    return;
  } else {
    const hashedPassword = await bcrypt.hash(password, 6);
    const createdUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      permission: permission,
    });
    res.status(201).json({
      name: createdUser.name,
      email: createdUser.email,
      permission: createdUser.permission,
    });
  }
};

// @desc    Login user
// @route   POST /api/users/sign-in
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({
        userId: user._id,
        name: user.name,
        email: user.email,
        permission: user.permission,
      });
    } else {
      res.status(400).json({
        //username found, but incorrect password
        isEmailMatch: true,
        isPasswordMatch: false,
      });
    }
  } else {
    //email not found
    res.status(400).json({
      isEmailMatch: false,
    });
  }
};

// @desc    Gets all users by permission type
// @route   GET /api/users/:permission
// @access  Public
const getAllStandardUsers = async (req, res) => {
  const { permission } = req.params;
  await User.find(
    {
      permission: permission?.toUpperCase(),
    },
    (err, allUsers) => {
      if (err) res.status(400).json(err);
      else {
        let resArr = [];
        for (let user of allUsers) {
          resArr.push({
            userId: user._id,
            name: user.name,
            email: user.email,
            permission: user.permission,
          });
        }
        res.status(200).json(resArr);
      }
    }
  ).clone();
};

module.exports = {
  addUser,
  loginUser,
  getAllStandardUsers,
};
