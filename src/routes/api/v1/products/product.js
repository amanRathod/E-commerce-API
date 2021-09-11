/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateToken = require('../../../../middleware/valid-supplier');
const book = require('../../../../controller/api/v1/products/book');

router.post('/book/create', [
  body('name').not().isEmpty().withMessage('Product Name is required'),
  body('price').not().isEmpty().withMessage('Product price is required'),
  body('image').not().isEmpty().withMessage('Product image is required'),
  body('category').not().isEmpty().withMessage('Product category is required'),
  body('stock').not().isEmpty().withMessage('Product stock is required'),
], authenticateToken, book.createProduct);

router.put('/book/update/:productId', authenticateToken, book.updateProduct);

module.exports = router;

