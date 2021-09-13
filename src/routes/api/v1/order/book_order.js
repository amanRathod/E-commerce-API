/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const book = require('../../../../controller/api/v1/order/book');
const authenticateConsumerToken = require('../../../../middleware/valid-user');

router.post('/create', [
  body('quantity').not().isEmpty().withMessage('quantity is required'),
  body('email').not().isEmpty().withMessage('Consumer Identity is required'),
  body('product_id').not().isEmpty().withMessage('Product Id is required'),
  body('basePrice').not().isEmpty().withMessage('basePrice is required'),
  body('payment_method').not().isEmpty().withMessage('payment_method is required'),
  body('delivery_address').not().isEmpty().withMessage('delivery_address is required'),
], authenticateConsumerToken, book.createOrder);

router.delete('/cancel/:orderId', authenticateConsumerToken, book.cancelOrder);
router.put('/success', authenticateConsumerToken, book.successOrder);

module.exports = router;
