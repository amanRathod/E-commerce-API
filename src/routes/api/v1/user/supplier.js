/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const supplier = require('../../../../controller/api/v1/user/supplier');
const authenticateToken = require('../../../../middleware/valid-supplier');

router.post('/login', [
  body('phone').not().isEmpty().withMessage('Phone is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
], supplier.login);

router.post('/register', [
  body('storeName').not().isEmpty().withMessage('Store Name is required'),
  body('phone').not().isEmpty().withMessage('Phone is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  body('panNumber').not().isEmpty().withMessage('Body is required'),
], supplier.register);

router.put('/update/personal-data/:supplierId', authenticateToken, supplier.updatePersonalData);
router.put('/update/bank-data/:supplierId', authenticateToken, supplier.updateBankData);
router.put('/update/address-data/:supplierId', authenticateToken, supplier.updateAddressData);
router.put('/update/pasword', supplier.updatePassword);


module.exports = router;
