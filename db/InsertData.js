const fs = require('fs');
const mysql = require('mysql2');

// יצירת חיבור למסד הנתונים
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'SmartQueuePro'
// });

const config = {
  user: "root",
  password: "elisheva",
  host: "127.0.0.1",
  port: 3306,
  database: "SmartQueuePro"
};

const con = mysql.createConnection(config);


// התחברות למסד הנתונים
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database SmartQueuePro");
  loadData();
});

function loadData() {
  fs.readFile('DB.JSON', 'utf8', async (err, jsonData) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const data = JSON.parse(jsonData);

    const sqlInsertUser = `
      INSERT INTO users (username, email, password_hash, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    const sqlInsertQueue = `
      INSERT INTO queues (name, description, location)
      VALUES (?, ?, ?)
    `;

    const sqlInsertCall = `
      INSERT INTO calls (queue_id, number, user_id, status)
      VALUES (?, ?, ?, ?)
    `;

    const sqlInsertStatistic = `
      INSERT INTO statistics (queue_id, date, avg_wait_time, calls_count)
      VALUES (?, ?, ?, ?)
    `;

    // הפיכת query לפורמט Promise
    const queryAsync = (sql, params) => {
      return new Promise((resolve, reject) => {
        con.query(sql, params, (err, results) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              console.warn(`Duplicate entry ignored: ${err.sqlMessage}`);
              return resolve();
            }
            return reject(err);
          }
          resolve(results);
        });
      });
    };

    try {
      const allQueries = [];

      // הכנסת משתמשים
      for (const user of data.users) {
        allQueries.push(queryAsync(sqlInsertUser, [
          user.username,
          user.email,
          user.password_hash,
          user.full_name,
          user.role
        ]));
      }

      // הכנסת תורים
      for (const queue of data.queues) {
        allQueries.push(queryAsync(sqlInsertQueue, [
          queue.name,
          queue.description,
          queue.location
        ]));
      }

      // הכנסת קריאות בתור
      for (const call of data.calls) {
        allQueries.push(queryAsync(sqlInsertCall, [
          call.queue_id,
          call.number,
          call.user_id,
          call.status
        ]));
      }

      // הכנסת סטטיסטיקות
      for (const stat of data.statistics) {
        allQueries.push(queryAsync(sqlInsertStatistic, [
          stat.queue_id,
          stat.date,
          stat.avg_wait_time,
          stat.calls_count
        ]));
      }

      await Promise.all(allQueries);
      console.log("All data inserted successfully.");

    } catch (err) {
      console.error("Error during data insertion:", err);
    } finally {
      con.end((err) => {
        if (err) console.error("Error closing connection:", err);
        else console.log("Connection closed.");
      });
    }
  });
}
