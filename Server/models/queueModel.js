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
    location,
    is_active: true
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
// Update Queue - make sure to handle undefined values
exports.updateQueue = async (id, { name, description, location }) => {
  try {
    // אם שדה לא קיים, נחליף אותו ב-null או ערך ברירת מחדל
    name = name || null;
    description = description || null;
    location = location || null;

    // עכשיו, נוודא שכולם נכונים ולא undefined
    const [result] = await pool.execute(
      `UPDATE queues SET name = ?, description = ?, location = ? WHERE id = ?`,
      [name, description, location, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Queue not found');
    }

    // מחזירים את התור המעודכן
    return await exports.getQueueById(id);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating queue');
  }
};


// Delete Queue
exports.deleteQueue = async (id) => {
  const [result] = await pool.execute(
    `DELETE FROM queues WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
};

exports.getCallsByQueueId = async (queueId) => {
  const query = 'SELECT * FROM Calls WHERE queue_id = ?';
  const [calls] = await db.execute(query, [queueId]);
  return calls;
};