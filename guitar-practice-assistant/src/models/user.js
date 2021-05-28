const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          'The password you provided is not strong enough! The password should be minimum 8 charachters long, should contain at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol.'
        );
      }
    },
  },
});

module.exports = User;
