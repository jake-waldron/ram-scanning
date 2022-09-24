const pool = require('./pool');

async function dbSetup() {
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
                        product_number VARCHAR(20) PRIMARY KEY,
                        product_name VARCHAR(100),
                        product_category VARCHAR(100) REFERENCES categories(product_category),
                        product_weight NUMERIC
                        );
                    `);
	await pool.query(`
                        COPY products(product_number, product_name, product_category, product_weight)
                        FROM '/app/server/dbStuff/raw_inventory.csv'
                        WITH DELIMITER ','
                        CSV HEADER
                    `);
}

module.exports = dbSetup;
