const express = require('express');
const cors = require('cors');

const productRouter = require('./routes/products');

module.exports = () => {
	const app = express();

	app.use(express.json());
	app.use(cors());
	app.use(productRouter);
	// app.get('/', (req, res, next) => {
	// 	console.log('request incoming');
	// 	res.send('IT worked!');
	// });

	return app;
};
