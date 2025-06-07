// DB/CreateTables.js
const mysql = require('mysql2/promise');

// הגדרות חיבור ל-DB
const config = {
  user: "root",
  password: "elisheva",  // שים כאן את הסיסמה שלך
  host: "127.0.0.1",
  port: 3306,
  database: "SmartQueuePro"
};
const con = mysql.createConnection(config);


async function createTables() {
  let connection;
  try {
    // פותחים חיבור
    connection = await mysql.createConnection(config);

    // טבלת משתמשים
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        role ENUM('client', 'secretary', 'admin') NOT NULL DEFAULT 'client',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // טבלת תורים
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS queues (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        location VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // טבלת קריאות בתור
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS calls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        queue_id INT NOT NULL,
        number INT NOT NULL,
        user_id INT,
        status ENUM('waiting', 'called', 'served', 'skipped') NOT NULL DEFAULT 'waiting',
        called_at DATETIME,
        served_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (queue_id) REFERENCES queues(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    // טבלת סטטיסטיקות
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS statistics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        queue_id INT NOT NULL,
        date DATE NOT NULL,
        avg_wait_time INT,
        calls_count INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (queue_id) REFERENCES queues(id) ON DELETE CASCADE
      );
    `);

    console.log("All tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    if (connection) await connection.end();
  }
}

// מריצים את הפונקציה
createTables();
