/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
const authenticateSupplierToken = require('../../../../middleware/valid-supplier');
// const authenticateAdminToken = require('../../../../middleware/valid-admin');
const book = require('../../../../controller/api/v1/products/book');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage: storage});


router.post('/supplier', [
  body('name').not().isEmpty().withMessage('Product Name is required'),
  body('price').not().isEmpty().withMessage('Product price is required'),
  body('image').not().isEmpty().withMessage('Product image is required'),
  body('category').not().isEmpty().withMessage('Product category is required'),
  body('stock').not().isEmpty().withMessage('Product stock is required'),
<<<<<<< HEAD
], [ authenticateSupplierToken], book.createProduct);
=======
], [ authenticateSupplierToken], upload.single('file'), book.createProductSupplier);

router.post('/admin', [
  body('name').not().isEmpty().withMessage('Product Name is required'),
  body('price').not().isEmpty().withMessage('Product price is required'),
  body('image').not().isEmpty().withMessage('Product image is required'),
  body('category').not().isEmpty().withMessage('Product category is required'),
  body('stock').not().isEmpty().withMessage('Product stock is required'),
], [ authenticateAdminToken], upload.single('file'), book.createProductAdmin);

router.put('/supplier/:productId', authenticateSupplierToken, book.updateProductSupplier);
>>>>>>> e5d88a31e72f627f457e5674454730a6236524f5

router.get('/:productId', authenticateSupplierToken, book.getProduct);

module.exports = router;
