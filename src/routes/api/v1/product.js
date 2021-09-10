const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/valid-user');

router.get('/', authenticateToken, async(req, res, next) => {
  try {
    res.send('product');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
module.exports = router;
