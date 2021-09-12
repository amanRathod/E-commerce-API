const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    default: 'consumer',
  },
  orders: {
    type: Array,
    default: [],
  },
  phone: {
    type: String,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
