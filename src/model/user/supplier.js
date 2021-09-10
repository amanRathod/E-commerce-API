const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  StoreName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  payment: {
    type: String,
    required: true,
  },
  productCategory: [{
    type: String,
    required: true,
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
