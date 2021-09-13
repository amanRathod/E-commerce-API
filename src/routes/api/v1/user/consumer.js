/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const consumer = require('../../../../controller/api/v1/user/consumer');
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
router.put('/update/pasword', authenticateConsumerToken, consumer.updatePassword);

module.exports = router;
