const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "keerthan123",
  database: "customers_db",
});

module.exports = pool;
