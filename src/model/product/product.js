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
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Shirt', 'Pants', 'Shoes', 'Accessories', 'books', 'Smart Phone'],
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
    ref: 'Product',
  }],
}, {
  timestamps: true,
});
const Products = mongoose.model('products', productSchema);
module.exports = Products;
