
// const pool = require('../../db/connection');

// // יצירת קריאה רגילה (כבר לא בשימוש - שמור רק אם צריך ל־CRUD ידני)
// exports.createCall = async ({ queue_id, number, user_id, status }) => {
//   const [result] = await pool.execute(
//     `INSERT INTO calls (queue_id, number, user_id, status) VALUES (?, ?, ?, ?)`,
//     [queue_id, number, user_id || null, status || 'waiting']
//   );

//   return {
//     id: result.insertId,
//     queue_id,
//     number,
//     user_id,
//     status: status || 'waiting',
//   };
// };

// // שליפת כל הקריאות
// exports.getAllCalls = async () => {
//   const [rows] = await pool.execute(`SELECT * FROM calls`);
//   return rows;
// };

// // שליפה לפי מזהה
// exports.getCallById = async (id) => {
//   const [rows] = await pool.execute(
//     `SELECT * FROM calls WHERE id = ?`,
//     [id]
//   );
//   return rows[0] || null;
// };

// // עדכון קריאה
// exports.updateCall = async (id, { queue_id, number, user_id, status, called_at, served_at }) => {
//   const [result] = await pool.execute(
//     `UPDATE calls SET queue_id = ?, number = ?, user_id = ?, status = ?, called_at = ?, served_at = ? WHERE id = ?`,
//     [queue_id, number, user_id, status, called_at, served_at, id]
//   );

//   if (result.affectedRows === 0) {
//     return null;
//   }

//   return exports.getCallById(id);
// };

// // מחיקת קריאה
// exports.deleteCall = async (id) => {
//   const [result] = await pool.execute(
//     `DELETE FROM calls WHERE id = ?`,
//     [id]
//   );

//   return result.affectedRows > 0;
// };

// // שליפת הקריאה הבאה שממתינה
// exports.getNextWaitingCall = async (queue_id) => {
//   const [rows] = await pool.execute(
//     `SELECT * FROM calls WHERE queue_id = ? AND status = 'waiting' ORDER BY number ASC LIMIT 1`,
//     [queue_id]
//   );
//   return rows[0] || null;
// };

// // שליפת קריאות לפי תור
// exports.getCallsByQueue = async (queue_id) => {
//   const [rows] = await pool.execute(
//     `SELECT * FROM calls WHERE queue_id = ? ORDER BY number ASC`,
//     [queue_id]
//   );
//   return rows;
// };

// // יצירת תור באופן אטומי עם נעילה (מונע כפילויות)
// exports.createCallAtomic = async (queue_id, user_id, clock) => {
//   const conn = await pool.getConnection();  
//   try {
//     await conn.beginTransaction();

//     // שליפת המספר האחרון עם FOR UPDATE
//     const [rows] = await conn.execute(
//       `SELECT MAX(number) AS lastNumber FROM calls WHERE queue_id = ? FOR UPDATE`,
//       [queue_id]
//     );

//     const lastNumber = rows[0].lastNumber || 0;
//     const newNumber = lastNumber + 1;

//     // יצירת קריאה חדשה עם המספר החדש
//     const [result] = await conn.execute(
//       `INSERT INTO calls (queue_id, number, user_id, status, created_at) VALUES (?, ?, ?, 'waiting', ?)`,
//       [queue_id, newNumber, user_id || null, clock.now()]
//     );

//     await conn.commit();

//     return {
//       id: result.insertId,
//       queue_id,
//       number: newNumber,
//       user_id,
//       status: 'waiting',
//     };
//   } catch (error) {
//     await conn.rollback();
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

// exports.getCallsByUserId = async (userId) => {
//   const sql = 'SELECT * FROM calls WHERE user_id = ?';
// const [rows] = await pool.execute('SELECT * FROM calls WHERE user_id = ?', [userId]);
//   return rows;
// };

const pool = require('../../db/connection');

// יצירת קריאה חדשה (לא בשימוש ישיר – השירות משתמש ב-createCallAtomic)
exports.createCall = async ({ queue_id, number, user_id, status }) => {
  const [result] = await pool.execute(
    `INSERT INTO calls (queue_id, number, user_id, status) VALUES (?, ?, ?, ?)`,
    [queue_id, number, user_id || null, status || 'waiting']
  );
  return { id: result.insertId, queue_id, number, user_id, status: status || 'waiting' };
};

// שליפת כל הקריאות
exports.getAllCalls = async () => {
  const [rows] = await pool.execute(`SELECT * FROM calls`);
  return rows;
};

// שליפה לפי מזהה קריאה
exports.getCallById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM calls WHERE id = ?`, [id]);
  return rows[0] || null;
};

// עדכון קריאה
exports.updateCall = async (id, { queue_id, number, user_id, status, called_at, served_at }) => {
  const [result] = await pool.execute(
    `UPDATE calls SET queue_id = ?, number = ?, user_id = ?, status = ?, called_at = ?, served_at = ? WHERE id = ?`,
    [queue_id, number, user_id, status, called_at, served_at, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return exports.getCallById(id);
};

// מחיקת קריאה
exports.deleteCall = async (id) => {
  const [result] = await pool.execute(`DELETE FROM calls WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};

// שליפת הקריאה הממתינה הבאה בתור מסוים
exports.getNextWaitingCall = async (queue_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE queue_id = ? AND status = 'waiting' ORDER BY number ASC LIMIT 1`,
    [queue_id]
  );
  return rows[0] || null;
};

// שליפת כל הקריאות בתור מסוים (מסודרות לפי מספר בתור)
exports.getCallsByQueue = async (queue_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE queue_id = ? ORDER BY number ASC`,
    [queue_id]
  );
  return rows;
};

// בדיקה האם למשתמש יש קריאה פתוחה בתור מסוים (ממתינה/נקראה)
exports.getUserOpenCallInQueue = async (userId, queueId) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE user_id = ? AND queue_id = ? AND status IN ('waiting', 'called')`,
    [userId, queueId]
  );
  return rows[0] || null;
};

// בדיקה האם למשתמש יש קריאה כלשהי היום (מניעה יותר מתור אחד ביום)
exports.userHasCallToday = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE user_id = ? AND DATE(created_at) = CURDATE()`,
    [userId]
  );
  return rows.length > 0;
};

// שליפת כל הקריאות של משתמש (רק פעילויות שלא הושלמו/בוטלו)
exports.getCallsByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE user_id = ? AND status IN ('waiting', 'called')`,
    [userId]
  );
  return rows;
};


