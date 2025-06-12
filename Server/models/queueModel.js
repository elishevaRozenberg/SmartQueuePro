const pool = require('../../db/connection');

// Create Queue
exports.createQueue = async ({ name, description, location }) => {
  const [result] = await pool.execute(
    `INSERT INTO queues (name, description, location) VALUES (?, ?, ?)`,
    [name, description, location]
  );

  return {
    id: result.insertId,
    name,
    description,
    location
  };
};

// Get All Queues
exports.getAllQueues = async () => {
  const [rows] = await pool.execute(`SELECT * FROM queues`);
  return rows;
};

// Get Queue By ID
exports.getQueueById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM queues WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

// Update Queue
exports.updateQueue = async (id, { name, description, location }) => {
  const [result] = await pool.execute(
    `UPDATE queues SET name = ?, description = ?, location = ? WHERE id = ?`,
    [name, description, location, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return exports.getQueueById(id);
};

// Delete Queue
exports.deleteQueue = async (id) => {
  const [result] = await pool.execute(
    `DELETE FROM queues WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};
