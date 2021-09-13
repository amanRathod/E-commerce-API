/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const authenticateConsumerToken = require('../../../../middleware/valid-user');
const product = require('../../../../controller/api/v1/products/product');

router.use('/book', require('./book-category'));

// add to cart
router.use('/add-to-cart/:productId', authenticateConsumerToken, product.addToCart);

module.exports = router;

