require('dotenv').config();
const pgp = require('pg-promise')();

// Create a database connection instance using the DATABASE_URL environment variable
const db = pgp(process.env.DATABASE_URL);

module.exports = db;
