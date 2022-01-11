/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const consumer = require('../../../../controller/api/v1/user/consumer');
const reset_password = require('../../../../controller/api/v1/user/reset_password');
const authenticateConsumerToken = require('../../../../middleware/valid-user');

router.post('/login', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
], consumer.login);

router.post('/register', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  body('name').not().isEmpty().withMessage('First name is required'),
], consumer.register);

router.put('/update/personal-data/:consumerId', authenticateConsumerToken, consumer.updatePersonalData);
router.put('/update/bank-data/:consumerId', authenticateConsumerToken, consumer.updateBankData);
router.put('/update/address-data/:consumerId', authenticateConsumerToken, consumer.updateAddressData);

router.post('/forgotPassword', [
  body('email').not().isEmpty().withMessage('Email is required'),
], reset_password.forgotPassword);

router.put('/resetPassword', [
  body('password').not().isEmpty().withMessage('Password is required'),
  body('token').not().isEmpty().withMessage('Token is required'),
], reset_password.resetPassword);

module.exports = router;
