const fs = require('fs');
const pool = require('../db/connection');

async function loadData() {
  try {
    const jsonData = await fs.promises.readFile('DB.JSON', 'utf8');
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

    const connection = await pool.getConnection();

    try {
      for (const user of data.users) {
        try {
          await connection.execute(sqlInsertUser, [
            user.username,
            user.email,
            user.password_hash,
            user.full_name,
            user.role
          ]);
        } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.warn(`Duplicate user entry ignored: ${err.sqlMessage}`);
          } else {
            throw err;
          }
        }
      }

      for (const queue of data.queues) {
        try {
          await connection.execute(sqlInsertQueue, [
            queue.name,
            queue.description,
            queue.location
          ]);
        } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.warn(`Duplicate queue entry ignored: ${err.sqlMessage}`);
          } else {
            throw err;
          }
        }
      }

      for (const call of data.calls) {
        try {
          await connection.execute(sqlInsertCall, [
            call.queue_id,
            call.number,
            call.user_id,
            call.status
          ]);
        } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.warn(`Duplicate call entry ignored: ${err.sqlMessage}`);
          } else {
            throw err;
          }
        }
      }

      for (const stat of data.statistics) {
        try {
          await connection.execute(sqlInsertStatistic, [
            stat.queue_id,
            stat.date,
            stat.avg_wait_time,
            stat.calls_count
          ]);
        } catch (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.warn(`Duplicate statistic entry ignored: ${err.sqlMessage}`);
          } else {
            throw err;
          }
        }
      }

      console.log("All data inserted successfully.");

    } finally {
      connection.release();
    }
    await pool.end();
    console.log("Connection closed.");

  } catch (err) {
    console.error("Error during data insertion:", err);
  }
}

loadData();
