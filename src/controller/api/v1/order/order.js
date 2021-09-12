/* eslint-disable max-len */
const { validatorResult } = require('express-validator');
const Order = require('../../../../model/order/order');

exports.createOrder = async(req, res, next) => {
  try {
    const error = validatorResult(req);
    if (!error) {
      res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }

    const { quantity, basePrice } = req.body;
    let tomorrow = new Date();

    // next day
    const delivery_date = tomorrow.setDate(tomorrow.getDate() + 1);

    // 10 am
    const delivery_time = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0, 0, 0) - tomorrow;

    const delivery_fee = 50;
    const totalPrice = basePrice * quantity * 0.18 + delivery_fee;

    const order = new Order({
      totalPrice,
      delivery_date,
      delivery_time,
      delivery_fee,
      ...req.body,
    });
    await order.save();

    return res.status(201).json({
      success: true,
      data: order,
    });

  } catch (err) {
    next(err);
  }
};

exports.getOneOrder = async(req, res, next) => {
  try {

    const error = validatorResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });

  } catch (err) {
    next(err);
  }
};
exports.getAllOrder = async(req, res, next) => {
  try {

    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async(req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    await order.remove();
    return res.status(200).json({
      success: true,
      message: 'Order deleted',
    });

  } catch (err) {
    next(err);
  }
};

