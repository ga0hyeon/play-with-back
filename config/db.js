var mysql = require("mysql2");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  //database: "play_with_db",
  //port: "3308",
  database: "mysql",
  port: "3306",
});

module.exports = db;
