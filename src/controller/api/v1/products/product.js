/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const Consumer = require('../../../../model/user/consumer');
const Product = require('../../../../model/product/product');

exports.addToCart = async(req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const productId = req.body.productId;

    // push productId into consumer's cart
    await Consumer.findByIdAndUpdate(req.user._id, { $push: { cart: productId } });

    return res.status(200).json({
      message: 'Product added to cart',
    });

  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async(req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const productId = req.body.productId;

    // remove productId from consumer's cart
    await Consumer.findByIdAndUpdate(req.user._id, { $pull: { cart: productId } });

    return res.status(200).json({
      message: 'Product removed from cart',
    });

  } catch (err) {
    next(err);
  }
};

exports.getCart = async(req, res, next) => {
  try {
    const consumer = await Consumer.findById(req.user._id);
    const cartData = await Product.find({ _id: { $in: consumer.cart } }).populate('productId').exec();
    return res.status(200).json({
      type: 'success',
      cart: cartData,
    });

  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async(req, res, next) => {
  try {
    const product = await Product.find({}).populate('productId').exec();
    return res.status(200).json({
      type: 'success',
      products: product,
    });

  } catch (err) {
    next(err);
  }
};
