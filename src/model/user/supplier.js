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
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  payment: {
    type: String,
  },
  productCategory: [{
    type: String,
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  panNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
}, {
  timestamps: true,
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
