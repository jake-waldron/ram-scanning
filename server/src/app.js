const express = require('express');
const cors = require('cors');

const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const scanRouter = require('./routes/scanRoutes');

module.exports = () => {
	const app = express();

	// ----- Middlewares -----
	app.use(express.json());
	app.use(cors());

	app.use((req, res, next) => {
		console.log('Request Received!');
		next();
	});

	// ----- Routes -----
	app.use('/api/categories', categoryRouter);
	app.use('/api/products', productRouter);
	app.use('/api/scan', scanRouter);

	return app;
};
