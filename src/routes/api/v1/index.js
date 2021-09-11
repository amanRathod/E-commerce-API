const express = require('express');
const router = express.Router();

router.use('/consumer', require('./user/consumer'));
router.use('/supplier', require('./user/supplier'));
router.use('/product', require('./products/product'));

module.exports = router;
