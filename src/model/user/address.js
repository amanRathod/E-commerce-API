const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  pincode: {
    type: Number,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
