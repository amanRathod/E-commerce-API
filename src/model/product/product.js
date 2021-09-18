const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Shirt', 'Pants', 'Shoes', 'Accessories', 'Book', 'SmartPhone'],
    required: true,
  },
  reviews: [{
    type: String,
  }],
  stock: {
    type: Number,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  owner: {
    type: String,
    enum: ['Admin', 'Supplier'],
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});
const Products = mongoose.model('products', productSchema);
module.exports = Products;
