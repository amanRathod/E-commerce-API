const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z]+$/,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]+$/,
    minlength: 10,
    maxlength: 10,
  },
  role: {
    type: String,
    default: 'admin',
  },
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
