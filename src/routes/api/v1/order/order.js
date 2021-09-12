/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const order = require('../../../../controller/api/v1/order/order');

router.get('/order/:order_id', order.getOneOrder);
router.get('/order', order.getAllOrder);

router.post('/order', [
  body('quantity').not().isEmpty().withMessage('quantity is required'),
  body('basePrice').not().isEmpty().withMessage('basePrice is required'),
  body('payment_method').not().isEmpty().withMessage('payment_method is required'),
  body('delivery_address').not().isEmpty().withMessage('delivery_address is required'),
], order.createOrder);

router.delete('/order/:order_id', order.delete);

module.exports = router;
