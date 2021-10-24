/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const Product = require('../../../../model/product/product');
const Book = require('../../../../model/product/books');
const { uploadFile } = require('../../../../../s3');

exports.createProductSupplier = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        error: error.array()[0].msg,
      });
    }

    // supplier is verified by admin
    if (!req.user.isVerified) {
      return res.status(422).json({
        success: false,
        message: 'You are not verified',
      });
    }

    const book = await Book.create({...req.body});

    req.body.productId = book._id;
    req.body.owner = 'Supplier';
    req.body.ownerId = req.user._id;
    let product;

    // if no image is uploaded, then add product without image
    if (req.file) {
      const photoURL = await uploadFile(req.file);
      product = await Product.create({ image: photoURL.Location, ...req.body });
    } else {
      product = await Product.create({...req.body });
    }

    return res.status(200).json({
      success: true,
      message: 'Product created successfully',
      book,
      product,
    });

  } catch (err) {
    next(err);
  }
};

exports.createProductAdmin = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        error: error.array()[0].msg,
      });
    }


    const book = await Book.create({...req.body});

    req.body.productId = book._id;
    req.body.owner = 'Admin';
    req.body.ownerId = req.user._id;
    let product;

    // if no image is uploaded, then add product without image
    if (req.file) {
      const photoURL = await uploadFile(req.file);
      product = await Product.create({image: photoURL.Location, ...req.body });
    } else {
      product = await Product.create({...req.body });
    }

    return res.status(200).json({
      success: true,
      message: 'Product created successfully',
      book,
      product,
    });

  } catch (err) {
    next(err);
  }
};


exports.updateProductSupplier = async(req, res, next) => {
  try {

    const productId = req.params.productId;

    // validate product, if it belong to current supplier or not
    const product = await Product.findById(productId);
    if (String(req.user._id) !== String(product.ownerId)) {
      return res.status(404).json({
        type: 'error',
        message: "this product doesn't belong to you",
      });
    }

    const products = await Product.findByIdAndUpdate({_id: productId}, req.body);
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const book = await Book.findByIdAndUpdate({_id: products.productId}, req.body);
    // const data = await Product.findOne({}).populate('Book');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      products,
      book,
    });

  } catch (err) {
    next(err);
  }
};


exports.getProduct = async(req, res, next) => {
  try {
    const productId = req.params.productId;

    // populate book and product model with related data
    const data = await Product.findById(productId).populate('productId').exec();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product found successfully',
      data,
    });

  } catch (err) {
    next(err);
  }
};
