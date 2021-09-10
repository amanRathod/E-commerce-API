/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const consumer = require('../../../../controller/api/v1/user/consumer');

router.post('/login', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
], consumer.login);

router.post('/register', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  body('name').not().isEmpty().withMessage('First name is required'),
], consumer.register);

module.exports = router;
