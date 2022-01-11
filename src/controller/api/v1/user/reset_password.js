/* eslint-disable max-len */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const nodemailerSendgrid = require('nodemailer-sendgrid');
const { validationResult } = require('express-validator');
const User = require('../../../../model/user/consumer');

// const transport = nodemailer.createTransport(nodemailerSendgrid({
//   apiKey: process.env.SENDGRID_API_KEY,
// }));

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
});

exports.forgotPassword = async(req, res, next) => {
  try {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // generate token
    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1); // one hour validity

    // store token in the database which is valid for one hour
    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    const EmailToUser = {
      to: email,
      from: 'aksrathod07@gmail.com',
      subject: 'Password Reset',
      html: `
        <h5> You are receiving this because you (or someone else) have requested the reset of the password for your account..</h5>
        <p>Please click on this <a href='http://localhost:3000/resetPassword/${token}'>link</a> to reset Password</p>
        <h5>If you did not request this, please ignore this email and your password will remain unchanged.</h5>
      `,
    };

    // send email
    transport.sendMail(EmailToUser, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: 'Something went wrong',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: `An e-mail has been sent to ${email} with further instructions.`,
      });

    });

  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async(req, res, next) => {
  try {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: error.array()[0].msg,
      });
    }

    const { password, token } = req.body;

    // find user by token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Password reset token is invalid or has expired',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save hashed password
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password has been reset',
    });

  } catch (err) {
    next(err);
  }
};
