/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateConsumerToken = require('../../../../middleware/valid-user');
const product = require('../../../../controller/api/v1/products/product');

router.use('/book', require('./book-category'));

// add to cart
router.post('/add-to-cart', [
  body('productId').not().isEmpty(),
], authenticateConsumerToken, product.addToCart);

router.delete('/remove-from-cart', [
  body('productId').not().isEmpty(),
], authenticateConsumerToken, product.removeFromCart);

router.get('/getcart', authenticateConsumerToken, product.getCart);

router.get('/get-all-products', authenticateConsumerToken, product.getAllProducts);

module.exports = router;

