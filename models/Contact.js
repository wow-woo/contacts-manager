const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  access_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collection_contacts'
  },
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
  phone: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('collection_contact', ContactSchema);
