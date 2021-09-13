/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const order = require('../../../../controller/api/v1/order/order');
const authenticateAdminToken = require('../../../../middleware/valid-admin');
const authenticateConsumerToken = require('../../../../middleware/valid-user');

router.get('/:order_id', authenticateConsumerToken, order.getOneOrder);
router.get('/getAll', authenticateAdminToken, order.getAllOrder);

router.use('/book', require('./book_order'));

module.exports = router;
