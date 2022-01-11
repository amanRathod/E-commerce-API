/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const Order = require('../../../../model/order/order');
const User = require('../../../../model/user/consumer');
const Products = require('../../../../model/product/product');
const Address = require('../../../../model/user/address');


exports.createOrder = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }

    const { quantity, product_id } = req.body;
    const consumer = req.user;

    const product = await Products.findById(product_id);
    if (!product) {
      return res.status(422).json({
        success: false,
        message: 'Product not found',
      });
    }

    // next day delivery
    let tomorrow = new Date();
    const delivery_date = tomorrow.setDate(tomorrow.getDate() + 1);

    // next day 10am delivery time
    const delivery_time = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0, 0, 0) - tomorrow;

    // total price to be paid by consumer on delivery date
    const delivery_fee = 50;
    const totalPrice = product.price * quantity * 0.18 + delivery_fee;

    // delivery-address of consumer
    const delivery_address = await Address.findOne({user: consumer._id});
    console.log(delivery_address);
    const order = new Order({
      totalPrice,
      product_id,
      delivery_date,
      delivery_time,
      delivery_fee,
      delivery_address: delivery_address.address,
      ...req.body,
    });
    await order.save();

    // add order-id into order-history of consumer
    await User.findOneAndUpdate({ email: consumer.email }, { $push: {orders: order._id} });

    // update product quantity
    await Products.findByIdAndUpdate({_id: product_id}, { $inc: {quantity: -quantity} });

    return res.status(201).json({
      success: true,
      data: order,
      delivery_address,
    });

  } catch (err) {
    next(err);
  }
};

exports.successOrder = async(req, res, next) => {
  try {
    const orderId = req.params.orderId;

    // update order status
    const order = await Order.findByIdAndUpdate({_id: orderId}, { $set: { delivery_status: 'accepted', payment_status: 'paid', ...req.body } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order delivered',
    });

  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async(req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndUpdate({_id: orderId}, { $set: { delivery_status: 'cancelled', delivery_date: '', delivery_time: '' } });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // increase product quantity
    await Products.findByIdAndUpdate({_id: order.product_id}, { $inc: {quantity: order.quantity} });

    return res.status(200).json({
      success: true,
      message: 'Order cancelled',
    });

  } catch (err) {
    next(err);
  }
};

