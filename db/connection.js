
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: 'elisheva',   // עדיף .env בהמשך
  database: 'SmartQueuePro'
});

// הפעלת Promise wrapper
const promisePool = pool.promise();

module.exports = promisePool;
