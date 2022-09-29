const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');

connectDB();

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';
const NAME = 'John Wayne';

(() => {
  bcrypt.hash(PASSWORD, 6).then((hashedPassword) => {
    User.create(
      {
        name: NAME,
        email: EMAIL,
        password: hashedPassword,
        permission: 'ADMIN',
      },
      (err, admin) => {
        console.log('DONEEEEEE');
      }
    );
  });
})();
