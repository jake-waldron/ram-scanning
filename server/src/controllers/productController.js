const pool = require('../pool');
const SQL = require('sql-template-strings');

const productRepo = require('../repos/productRepo');

async function findAll(req, res, next) {
	const products = await productRepo.findAll();
	res.send(products);
}

async function findOne(req, res, next) {
	const { id } = req.params;
	const product = await productRepo.findProductById(id);
	res.send(product);
}

module.exports = {
	findAll,
	findOne,
};
