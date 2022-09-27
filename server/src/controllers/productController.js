const pool = require('../pool');
const SQL = require('sql-template-strings');

async function findAll(req, res, next) {
	const { rows } = await pool.query('SELECT * FROM products');
	res.send(rows);
}

async function findOne(req, res, next) {
	const { id } = req.params;
	const { rows } = await pool.query(
		SQL`SELECT *, months 
            FROM products 
            JOIN categories ON categories.product_category = products.product_category
            WHERE product_number = ${id}`
	);
	res.send(rows);
}

module.exports = {
	findAll,
	findOne,
};
