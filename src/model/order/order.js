const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'Offer',
  },
  delivery_status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending',
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash',
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'canceled'],
    default: 'pending',
  },
  payment_date: {
    type: Date,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  delivery_date: {
    type: Date,
  },
  delivery_time: {
    type: String,
  },
  delivery_fee: {
    type: Number,
  },

}, {
  timestamps: true,
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
