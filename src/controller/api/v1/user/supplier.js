/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Supplier = require('../../../../model/user/supplier');
const { validationResult } = require('express-validator');

exports.login = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()){
      return res.status(422).json({
        message: 'Validation failed',
        errors: error.array(),
      });
    }
    const { phone, password } = req.body;
    const supplier = await Supplier.findOne({ phone });
    if (!supplier) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    const token = jwt.sign({supplierId: supplier._id, phone: phone}, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()){
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }
    const { storeName, phone, password, panNumber } = req.body;
    const supplier = await Supplier.findOne({ phone });
    if (supplier) {
      return res.status(422).json({
        success: false,
        message: 'Supplier already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newSupplier = new Supplier({
      storeName,
      phone,
      password: hashedPassword,
      panNumber,
    });
    await newSupplier.save();
    return res.status(200).json({
      message: 'Supplier registered successfully',
    });
  } catch (err) {
    next(err);
  }
};
