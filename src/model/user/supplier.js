const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  productCategory: [{
    type: String,
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  description: {
    type: String,
  },
  role: {
    type: String,
    default: 'supplier',
  },
  website: {
    type: String,
  },
  panNumber: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
  },
}, {
  timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
