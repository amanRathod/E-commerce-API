/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateSupplierToken = require('../../../../middleware/valid-supplier');
const authenticateAdminToken = require('../../../../middleware/valid-admin');
const book = require('../../../../controller/api/v1/products/book');

router.post('/supplier', [
  body('name').not().isEmpty().withMessage('Product Name is required'),
  body('price').not().isEmpty().withMessage('Product price is required'),
  body('image').not().isEmpty().withMessage('Product image is required'),
  body('category').not().isEmpty().withMessage('Product category is required'),
  body('stock').not().isEmpty().withMessage('Product stock is required'),
], [ authenticateSupplierToken], book.createProductSupplier);

router.post('/admin', [
  body('name').not().isEmpty().withMessage('Product Name is required'),
  body('price').not().isEmpty().withMessage('Product price is required'),
  body('image').not().isEmpty().withMessage('Product image is required'),
  body('category').not().isEmpty().withMessage('Product category is required'),
  body('stock').not().isEmpty().withMessage('Product stock is required'),
], [ authenticateAdminToken], book.createProductAdmin);

router.put('/supplier/:productId', authenticateSupplierToken, book.updateProductSupplier);

router.get('/:productId', authenticateSupplierToken, book.getProduct);

module.exports = router;
