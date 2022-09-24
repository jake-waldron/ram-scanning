const express = require('express');

const productRouter = require('./routes/products');

module.exports = () => {
	const app = express();

	app.use(express.json());
	app.use(productRouter);
	// app.get('/', (req, res, next) => {
	// 	console.log('request incoming');
	// 	res.send('IT worked!');
	// });

	return app;
};
