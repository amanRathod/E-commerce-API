const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Book = require('../../model/product/books');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }],
  supplier: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
const Products = mongoose.model('products', productSchema);
module.exports = Products;
