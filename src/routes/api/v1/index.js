const express = require('express');
const router = express.Router();

router.use('/consumer', require('./user/consumer'));
router.use('/supplier', require('./user/supplier'));
router.use('/admin', require('./user/admin'));
router.use('/product', require('./products/product'));
router.use('/order', require('./order/index'));

module.exports = router;
