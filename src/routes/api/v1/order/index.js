/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const order = require('../../../../controller/api/v1/order/order');
const authenticateAdminToken = require('../../../../middleware/valid-admin');
const authenticateConsumerToken = require('../../../../middleware/valid-user');

router.get('/:orderId', authenticateConsumerToken, order.getOneOrder);
router.get('/', authenticateAdminToken, order.getAllOrder);

router.use('/book', require('./book_order'));

module.exports = router;
