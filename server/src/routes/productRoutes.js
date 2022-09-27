const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router.get('/products', productController.findAll);

router.get('/products/:id', productController.findOne);

module.exports = router;
