/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Product = require('../../../../model/product/product');
const Book = require('../../../../model/product/books');


// multer config for image upload
const storage = multer.diskStorage({
  destination: './public/productImage/',
  filename: function(req, file, cb){
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});

const productImage = multer({ storage: storage, limits: {fileSize: 100000 }}); // limit 10MB

exports.createProduct = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(422).json({
        success: false,
        error: error.array()[0].msg,
      });
    }

    // supplier is varified by admin
    if (!req.user.isVarified) {
      return res.status(422).json({
        success: false,
        message: 'You are not verified',
      });
    }

    productImage.single('file');

    const book = await Book.create({...req.body});
    const photoURL = req.protocol + '://' + req.get('host') + '/' + req.file.path;
    await Product.create({product: book._id, supplier: req.user.email, image: photoURL, ...req.body });

    return res.status(200).json({
      success: true,
      message: 'Product created successfully',
      book,
    });

  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async(req, res, next) => {
  try {

    const productId = req.params.productId;
    console.log(productId);
    const products = await Product.findByIdAndUpdate({_id: productId}, ...req.body);
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    await Book.findByIdAndUpdate({_id: products.product}, ...req.body);
    // const data = await Product.findOne({}).populate('Book');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      Product,
      Book,
    });

  } catch (err) {
    next(err);
  }
};
