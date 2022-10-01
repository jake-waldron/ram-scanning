const pool = require('../pool');

async function dbInit() {
	await pool.query(`
                    CREATE TABLE IF NOT EXISTS categories (
                        product_category VARCHAR(100) PRIMARY KEY,
                        months INTEGER
                        );
                    `);
	await pool.query(`
                        COPY categories (product_category, months)
                        FROM '/app/server/dbStuff/categories.csv'
                        WITH DELIMITER ','
                    `);
	await pool.query(`
                    CREATE TABLE IF NOT EXISTS products (
                        number VARCHAR(20) PRIMARY KEY,
                        name VARCHAR(100),
                        category VARCHAR(100) REFERENCES categories(product_category),
                        weight NUMERIC
                        );
                    `);
	await pool.query(`
                        COPY products(number, name, category, weight)
                        FROM '/app/server/dbStuff/raw_inventory.csv'
                        WITH DELIMITER ','
                        CSV HEADER
                    `);
}

module.exports = dbInit;
