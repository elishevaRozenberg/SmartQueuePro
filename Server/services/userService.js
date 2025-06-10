

const bcrypt = require('bcrypt');
const pool = require('../../db/connection');

// Create User
exports.createUser = async ({ username, email, password, full_name, role }) => {
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const [result] = await pool.execute(
    `INSERT INTO users (username, email, password_hash, full_name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [username, email, password_hash, full_name, role || 'client']
  );

  return {
    id: result.insertId,
    username,
    email,
    full_name,
    role: role || 'client'
  };
};

// Get All Users
exports.getAllUsers = async () => {
  const [rows] = await pool.execute(`SELECT * FROM users`);
  return rows;
};

// Get User by ID
exports.getUserById = async (id) => {
  const [rows] = await pool.execute(`SELECT id, username, email, full_name, role FROM users WHERE id = ?`, [id]);
  return rows[0] || null;
};

// Update User
exports.updateUser = async (id, { username, email, full_name, role }) => {
  const [result] = await pool.execute(
    `UPDATE users SET username = ?, email = ?, full_name = ?, role = ? WHERE id = ?`,
    [username, email, full_name, role, id]
  );
  if (result.affectedRows === 0) {
    return null;
  }
  return exports.getUserById(id);
};

// Delete User
exports.deleteUser = async (id) => {
  const [result] = await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};



exports.getUserByPasswordAndUserName = async (username) => {
  try {
    const sql = `
      SELECT password_hash AS password, email, full_name AS name, username, id, role
      FROM users
      WHERE username = ?
    `;
    const [rows] = await pool.execute(sql, [username]);
    const user = rows[0] || null;
    return user;
  } catch (err) {
    throw err;
  }
};


