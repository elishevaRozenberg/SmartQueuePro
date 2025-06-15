// const pool = require('../../db/connection');

// // Create Call
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

// // Get All Calls
// exports.getAllCalls = async () => {
//   const [rows] = await pool.execute(`SELECT * FROM calls`);
//   return rows;
// };

// // Get Call By ID
// exports.getCallById = async (id) => {
//   const [rows] = await pool.execute(
//     `SELECT * FROM calls WHERE id = ?`,
//     [id]
//   );
//   return rows[0] || null;
// };

// // Update Call
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

// // Delete Call
// exports.deleteCall = async (id) => {
//   const [result] = await pool.execute(
//     `DELETE FROM calls WHERE id = ?`,
//     [id]
//   );

//   return result.affectedRows > 0;
// };

// ///////////////


// exports.createCallAtomic = async (queue_id, user_id, clock) => {
//   const conn = await pool.getConnection();  
//   try {
//     await conn.beginTransaction();

//     // 1. קבל את המספר האחרון שהוקצה לתור הזה עם נעילה FOR UPDATE
//     const [rows] = await conn.execute(
//       `SELECT MAX(number) AS lastNumber FROM calls WHERE queue_id = ? FOR UPDATE`,
//       [queue_id]
//     );

//     const lastNumber = rows[0].lastNumber || 0;
//     const newNumber = lastNumber + 1;

//     // 2. הוסף קריאה חדשה עם המספר החדש
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


const pool = require('../../db/connection');

// יצירת קריאה רגילה (כבר לא בשימוש - שמור רק אם צריך ל־CRUD ידני)
exports.createCall = async ({ queue_id, number, user_id, status }) => {
  const [result] = await pool.execute(
    `INSERT INTO calls (queue_id, number, user_id, status) VALUES (?, ?, ?, ?)`,
    [queue_id, number, user_id || null, status || 'waiting']
  );

  return {
    id: result.insertId,
    queue_id,
    number,
    user_id,
    status: status || 'waiting',
  };
};

// שליפת כל הקריאות
exports.getAllCalls = async () => {
  const [rows] = await pool.execute(`SELECT * FROM calls`);
  return rows;
};

// שליפה לפי מזהה
exports.getCallById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE id = ?`,
    [id]
  );
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
  const [result] = await pool.execute(
    `DELETE FROM calls WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};

// שליפת הקריאה הבאה שממתינה
exports.getNextWaitingCall = async (queue_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE queue_id = ? AND status = 'waiting' ORDER BY number ASC LIMIT 1`,
    [queue_id]
  );
  return rows[0] || null;
};

// שליפת קריאות לפי תור
exports.getCallsByQueue = async (queue_id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM calls WHERE queue_id = ? ORDER BY number ASC`,
    [queue_id]
  );
  return rows;
};

// יצירת תור באופן אטומי עם נעילה (מונע כפילויות)
exports.createCallAtomic = async (queue_id, user_id, clock) => {
  const conn = await pool.getConnection();  
  try {
    await conn.beginTransaction();

    // שליפת המספר האחרון עם FOR UPDATE
    const [rows] = await conn.execute(
      `SELECT MAX(number) AS lastNumber FROM calls WHERE queue_id = ? FOR UPDATE`,
      [queue_id]
    );

    const lastNumber = rows[0].lastNumber || 0;
    const newNumber = lastNumber + 1;

    // יצירת קריאה חדשה עם המספר החדש
    const [result] = await conn.execute(
      `INSERT INTO calls (queue_id, number, user_id, status, created_at) VALUES (?, ?, ?, 'waiting', ?)`,
      [queue_id, newNumber, user_id || null, clock.now()]
    );

    await conn.commit();

    return {
      id: result.insertId,
      queue_id,
      number: newNumber,
      user_id,
      status: 'waiting',
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
