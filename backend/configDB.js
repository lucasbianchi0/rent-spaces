// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'rent-spaces',
//   password: 'postgres',
//   port: 5432, 
// });

// module.exports = pool;
const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
