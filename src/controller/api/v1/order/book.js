/* eslint-disable max-len */
const { validatorResult } = require('express-validator');
const Order = require('../../../../model/order/order');
const User = require('../../../../model/user/consumer');
const Products = require('../../../../model/product/product');

exports.createOrder = async(req, res, next) => {
  try {
    const error = validatorResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }

    const user = await User.findById(req.user._id);
    if (!user.isVarified) {
      return res.status(422).json({
        success: false,
        message: 'You are not verified',
      });
    }

    const { quantity, basePrice, email, product_id } = req.body;
    // next day
    let tomorrow = new Date();
    const delivery_date = tomorrow.setDate(tomorrow.getDate() + 1);

    // 10 am
    const delivery_time = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0, 0, 0) - tomorrow;

    const delivery_fee = 50;
    const totalPrice = basePrice * quantity * 0.18 + delivery_fee;

    const order = new Order({
      totalPrice,
      product_id,
      delivery_date,
      delivery_time,
      delivery_fee,
      ...req.body,
    });
    await order.save();

    // add order-id into order-history of consumer
    await User.findOneAndUpdate({ email }, { $push: {orders: order._id} });

    // update product quantity
    await Products.findByIdAndUpdate({_id: product_id}, { $inc: {quantity: -quantity} });

    return res.status(201).json({
      success: true,
      data: order,
    });

  } catch (err) {
    next(err);
  }
};

exports.successOrder = async(req, res, next) => {
  try {
    const orderId = req.params.orderId;
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

    await Products.findByIdAndUpdate({_id: order.product_id}, { $inc: {quantity: order.quantity} });

    return res.status(200).json({
      success: true,
      message: 'Order cancelled',
    });

  } catch (err) {
    next(err);
  }
};

