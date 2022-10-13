const pool = require('../pool');

async function dbInit() {
	await pool.query(`
                    CREATE TABLE IF NOT EXISTS categories (
                        product_category VARCHAR(100) PRIMARY KEY,
                        months INTEGER
                        );
                        `);
	await pool.query(`
                    CREATE TABLE IF NOT EXISTS products (
                        number VARCHAR(20) PRIMARY KEY,
                        name VARCHAR(100),
                        category VARCHAR(100) REFERENCES categories(product_category),
                        weight NUMERIC
                        );
                    `);

	console.log('CHECKING DATABASE');

	const { rows: checkProducts } = await pool.query(
		'SELECT * FROM products LIMIT 5'
	);
	const { rows: checkCategories } = await pool.query(
		'SELECT * FROM categories LIMIT 5'
	);

	if (checkProducts.length > 0 && checkCategories.length > 0) {
		console.log(checkCategories.length);
		console.log(checkProducts.length);
		return;
	}

	await pool.query(`
                        COPY categories (product_category, months)
                        FROM '/app/server/dbStuff/categories.csv'
                        WITH DELIMITER ','
                    `);
	await pool.query(`
                        COPY products(number, name, category, weight)
                        FROM '/app/server/dbStuff/raw_inventory.csv'
                        WITH DELIMITER ','
                        CSV HEADER
                    `);
}

module.exports = dbInit;
