const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

router.route('/').get(productController.findAll);

router.route('/:id').get(productController.findOne);

module.exports = router;
