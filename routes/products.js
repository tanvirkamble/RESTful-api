const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTest,
} = require('../controllers/products');

router.route('/').get(getAllProducts);

module.exports = router;
