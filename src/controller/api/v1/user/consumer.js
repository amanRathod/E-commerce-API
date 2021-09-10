/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../../../../model/user/consumer');

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
