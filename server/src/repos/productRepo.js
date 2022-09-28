const pool = require('../pool');
const SQL = require('sql-template-strings');

async function findAll() {
	const { rows } = await pool.query('SELECT * FROM products');
	return rows;
}

async function findProductById(id) {
	const { rows } = await pool.query(
		SQL`SELECT *, months 
            FROM products 
            JOIN categories ON categories.product_category = products.category
            WHERE number = ${id}`
	);
	const product = rows[0];
	return product;
}

async function findProductByIdList(listOfIds) {
	const placeholders = listOfIds.map((id, idx) => `$${idx + 1}`).join(', ');
	const { rows } = await pool.query(
		`SELECT *, months
			FROM products
			JOIN categories ON categories.product_category = products.category
			WHERE number IN (${placeholders})`,
		[...listOfIds]
	);
	const product = rows[0];
	return product;
}

module.exports = {
	findAll,
	findProductById,
	findProductByIdList,
};
