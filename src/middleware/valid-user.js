const jwt = require('jsonwebtoken');
const User = require('../model/user/consumer');

const authenticateConsumerToken = async(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(' ')[1];
    if (bearerToken === null) res.sendStatus(401);
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticateConsumerToken;


