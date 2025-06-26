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


// שליפת כל הקריאות עבור תור מסוים (בהתאם ל־queue_id)
exports.getCallsByQueueId = async (queueId) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM calls WHERE queue_id = ?`, 
      [queueId]  // עובר על ה־queue_id בתור השאילתה
    );
    return rows;  // מחזיר את כל הקריאות שנמצאו עבור ה־queue_id
  } catch (err) {
    throw err;  // אם יש שגיאה בשאילתה, מחזיר אותה
  }
};