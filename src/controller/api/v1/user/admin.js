/* eslint-disable max-len */
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../../../model/user/admin');
const Address = require('../../../../model/user/address');
const Bank = require('../../../../model/user/bank');

exports.login = async(req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        message: error.array()[0].msg,
      });
    }

    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      message: 'Login success',
      token,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.register = async(req, res) => {
  try {
    const error = validationResult(req);
    if (!error) {
      res.send(404).json({
        message: error.array()[0].msg,
      });
    }

    const { email, password, username } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const checkUsername = await Admin.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({
        message: 'Username already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      password: hashedPassword,
      ...req.body,
    });

    return res.status(201).json({
      message: 'User created',
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updatePersonalData = async(req, res, next) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findByIdAndUpdate({_id: adminId}, req.body);
    if (!admin){
      return res.status(404).json({
        message: 'admin not found',
      });
    }
    return res.status(200).json({
      message: 'admin personal-data updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAddressData = async(req, res, next) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Address.findOneAndUpdate({user: adminId}, req.body);
    if (!admin){
      await Address.create({
        user: adminId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'admin address updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBankData = async(req, res, next) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Bank.findOneAndUpdate({user: adminId}, req.body);
    if (!admin){
      await Bank.create({
        user: adminId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'admin bank details updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
exports.updatePassword = async(req, res, next) => {};
