const express = require('express');
const scanController = require('./../controllers/scanController');

const router = express.Router();

router.route('/find-expired-product').get(scanController.findExpiredProduct);
router.route('/generate-pdf').post(scanController.generatePDF);

// router.route('/:id').get(productController.findOne);

module.exports = router;
