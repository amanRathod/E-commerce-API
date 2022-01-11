const jwt = require('jsonwebtoken');
const Supplier = require('../model/user/supplier');

const authenticateSupplierToken = async(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(' ')[1];
    if (bearerToken === null) res.sendStatus(401);
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    const user = await Supplier.findById(decoded.id);
    if (!user) res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticateSupplierToken;

