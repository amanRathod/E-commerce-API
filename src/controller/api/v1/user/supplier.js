/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Supplier = require('../../../../model/user/supplier');
const Address = require('../../../../model/user/address');
const Bank = require('../../../../model/user/bank');
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
    const token = jwt.sign({id: supplier._id, phone: phone}, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return res.status(200).json({
      message: 'Login successful',
      token,
      supplierId: supplier.id,
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

exports.updatePersonalData = async(req, res, next) => {
  try {
    const supplierId = req.params.supplierId;
    const supplier = await Supplier.findByIdAndUpdate({_id: supplierId}, req.body);
    if (!supplier){
      return res.status(404).json({
        message: 'Supplier not found',
      });
    }
    return res.status(200).json({
      message: 'Supplier personal-data updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAddressData = async(req, res, next) => {
  try {
    const supplierId = req.params.supplierId;
    const supplier = await Address.findOneAndUpdate({user: supplierId}, req.body);
    if (!supplier){
      await Address.create({
        user: supplierId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'Supplier address updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBankData = async(req, res, next) => {
  try {
    const supplierId = req.params.supplierId;
    const supplier = await Bank.findOneAndUpdate({user: supplierId}, req.body);
    if (!supplier){
      await Bank.create({
        user: supplierId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'Supplier bank details updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
exports.updatePassword = async(req, res, next) => {};

