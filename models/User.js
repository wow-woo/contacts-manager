const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email address is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('collection_user', UserSchema);
