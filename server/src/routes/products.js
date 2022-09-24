const express = require('express');
const pool = require('../pool');
const SQL = require('sql-template-strings');

const router = express.Router();

router.get('/', async (req, res, next) => {
	// console.log('request incoming');
	// res.send('IT worked!');
	const { rows } = await pool.query('SELECT * FROM categories');
	res.send(rows);
});

router.get('/products', async (req, res, next) => {
	const { rows } = await pool.query('SELECT * FROM products');
	res.send(rows);
});

router.get('/products/:id', async (req, res, next) => {
	const { id } = req.params;
	const { rows } = await pool.query(
		SQL`SELECT *, months 
        FROM products 
        JOIN categories ON categories.product_category = products.product_category
        WHERE product_number = ${id}`
	);
	res.send(rows);
});

module.exports = router;
