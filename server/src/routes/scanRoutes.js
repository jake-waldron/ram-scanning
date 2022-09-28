const express = require('express');
const scanController = require('./../controllers/scanController');

const router = express.Router();

router.route('/:scan').post(scanController.getProduct);

// router.route('/:id').get(productController.findOne);

module.exports = router;
