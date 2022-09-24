const path = require('path');
const app = require('./src/app');
const pool = require('./src/pool');

const dbSetup = require('./src/dbSetup');

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

		dbSetup();

		app().listen(3000, () => {
			console.log('Server connected. Listening on port 3000');
		});
	} catch (err) {
		console.error(err);
	}
}

startServer();
