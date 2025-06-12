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
