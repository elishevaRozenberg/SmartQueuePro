const bcrypt = require('bcrypt');
const connection = require('../db/connection'); // קובץ חיבור ל-MySQL

exports.createUser = async ({ username, email, password, full_name, role }) => {
  // הצפנת סיסמה
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  // הכנסת נתונים
  const [result] = await connection.execute(
    `INSERT INTO users (username, email, password_hash, full_name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [username, email, password_hash, full_name, role || 'client']
  );

  // מחזירים ID ופרטים בסיסיים (ללא סיסמה)
  return {
    id: result.insertId,
    username,
    email,
    full_name,
    role: role || 'client'
  };
};
