const express = require('express');
const pool = require('../pool');
const SQL = require('sql-template-strings');

const router = express.Router();

router.get('/categories', async (req, res, next) => {
	// console.log('request incoming');
	// res.send('IT worked!');
	const { rows } = await pool.query('SELECT * FROM categories');
	res.send(rows);
});

module.exports = router;
