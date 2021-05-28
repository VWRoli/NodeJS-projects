const mongoose = require('mongoose');

const PracticeItem = mongoose.model('PracticeItem', {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = PracticeItem;
