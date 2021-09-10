const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', async(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({
      where: {
        bearerToken,
      },
    });
    if (!user) {
      res.status(403).send('Invalid user');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
