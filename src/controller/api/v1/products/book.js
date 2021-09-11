/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Product = require('../../../../model/product/product');
const Book = require('../../../../model/product/books');
const SmartPhone = require('../../../../model/product/smartPhone');


exports.createProduct = async(req, res, next) => {
  try {

    const error = validationResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        error: error.array()[0].msg,
      });
    }

    const book = await Book.create({...req.body});
    const products = await Product.create({product: book._id, ...req.body });

    return res.status(200).json({
      success: true,
      message: 'Product created successfully',
    });

  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async(req, res, next) => {
  try {

    const productId = req.params.productId;
    const products = await Product.findByIdAndUpdate({_id: productId}, ...req.body);
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    console.log(products);
    await Book.findByIdAndUpdate({_id: products.product}, ...req.body);
    // const data = await Product.findOne({}).populate('Book');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
    });

  } catch (err) {
    next(err);
  }
};
