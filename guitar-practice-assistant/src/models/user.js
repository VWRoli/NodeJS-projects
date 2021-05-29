const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
//? GENERATE TOKEN
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    'guitarpracticeassistant'
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

//? Find user, and match for password
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Unable to login, please check your email and password!');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login, please check your email and password!');
  }
  return user;
};

//? Hash passwords before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
