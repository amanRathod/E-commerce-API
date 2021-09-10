const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../../../controller/api/v1/userController');


router.post('/login', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
], userController.login);

router.post('/register', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  body('role').not().isEmpty().withMessage('Role is required'),
], userController.register);

module.exports = router;
