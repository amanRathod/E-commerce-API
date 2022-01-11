/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../../../../model/user/consumer');
const Address = require('../../../../model/user/address');
const Bank = require('../../../../model/user/bank');

exports.login = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({
        success: false,
        message: 'Email or Password is incorrect',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({
        success: false,
        message: 'Email or Password is incorrect',
      });
    }
    const token = jwt.sign({email: email, id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    return res.status(200).json({
      success: true,
      message: 'Login Successfully',
      token,
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.register = async(req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({
        success: false,
        message: 'Consumer already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(200).json({
      success: true,
      message: 'Register Successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Server is Invalid',
    });
  };
};

exports.updatePersonalData = async(req, res, next) => {
  try {
    const consumerId = req.params.consumerId;
    const consumer = await User.findByIdAndUpdate({_id: consumerId}, req.body);
    if (!consumer){
      return res.status(404).json({
        message: 'consumer not found',
      });
    }
    return res.status(200).json({
      message: 'consumer personal-data updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAddressData = async(req, res, next) => {
  try {
    const consumerId = req.params.consumerId;
    const consumer = await Address.findOneAndUpdate({user: consumerId}, req.body);
    if (!consumer){
      await Address.create({
        user: consumerId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'Consumer address updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBankData = async(req, res, next) => {
  try {
    const consumerId = req.params.consumerId;
    const consumer = await Bank.findOneAndUpdate({user: consumerId}, req.body);
    if (!consumer){
      await Bank.create({
        user: consumerId,
        ...req.body,
      });
    }
    return res.status(200).json({
      message: 'Consumer bank details updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
