/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const Consumer = require('../../../../model/user/consumer');

exports.addToCart = async(req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const productId = req.body.productId;
    await Consumer.findByIdAndUpdate(req.user._id, { $push: { cart: productId } });

    return res.status(200).json({
      message: 'Product added to cart',
    });

  } catch (err) {
    next(err);
  }
};
