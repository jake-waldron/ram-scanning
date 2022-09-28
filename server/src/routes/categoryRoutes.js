const express = require('express');
const categoryController = require('./../controllers/categoryController');

const router = express.Router();

router.route('/').get(categoryController.findAll);

router.route('/:category').get(categoryController.findOne);

module.exports = router;
