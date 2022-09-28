const pool = require('../pool');
const SQL = require('sql-template-strings');

async function findAll(req, res, next) {
	const { rows } = await pool.query('SELECT * FROM categories');
	res.send(rows);
}

async function findOne(req, res, next) {
	const { category } = req.params;
	const { rows } = await pool.query(
		SQL`SELECT * FROM categories WHERE product_category = ${category}`
	);
	res.send(rows);
}

module.exports = {
	findAll,
	findOne,
};
