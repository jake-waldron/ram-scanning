const path = require('path');
const app = require('./src/app');
const pool = require('./src/pool');

const dbInit = require('./src/utils/dbInit');

const categories = path.join(__dirname, '/dbStuff/categories.csv');

async function startServer() {
	try {
		await pool.connect({
			host: 'postgres',
			port: 5432,
			database: 'return_scanning',
			user: 'jakewaldron',
			password: 'password',
		});

		// dbInit();

		app().listen(8080, () => {
			console.log('Server connected. Listening on port 8080');
		});
	} catch (err) {
		console.error(err);
	}
}

startServer();
