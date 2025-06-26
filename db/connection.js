
const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   port: 3306,
//   password: 'elisheva',   // עדיף .env בהמשך
//   database: 'SmartQueuePro'
// });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'smartqueue',
  password: 'Er8546200',
  database: 'smartqueue', // שימי לב לשם מדויק של הדאטהבייס שלך
});
// הפעלת Promise wrapper
const promisePool = pool.promise();

module.exports = promisePool;
