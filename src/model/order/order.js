const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'Offer',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'canceled'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  payment: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash',
  },
}, {
  timestamps: true,
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
