/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const admin = require('../../../../controller/api/v1/user/admin');
const authenticateToken = require('../../../../middleware/valid-admin');

router.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], admin.login);

router.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('username').isEmpty(),
  check('name').isEmpty(),
  check('phone').isEmpty(),
], admin.register);


router.put('/update/personal-data/:adminId', authenticateToken, admin.updatePersonalData);
router.put('/update/bank-data/:adminId', authenticateToken, admin.updateBankData);
router.put('/update/address-data/:adminId', authenticateToken, admin.updateAddressData);
router.put('/update/password/:token', admin.updatePassword);

module.exports = router;
