// statisticsModel.js (MySQL)
const db = require('../../db/connection');

exports.createStatistic = async ({ queue_id, date, avg_wait_time, calls_count }) => {
  const [result] = await db.execute(
    'INSERT INTO statistics (queue_id, date, avg_wait_time, calls_count) VALUES (?, ?, ?, ?)',
    [queue_id, date, avg_wait_time, calls_count]
  );
  return { id: result.insertId, queue_id, date, avg_wait_time, calls_count };
};

exports.getAllStatistics = async () => {
  const [rows] = await db.execute('SELECT * FROM statistics');
  return rows;
};

exports.getStatisticById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM statistics WHERE id = ?', [id]);
  return rows[0];
};

exports.updateStatistic = async (id, { avg_wait_time, calls_count }) => {
  await db.execute(
    'UPDATE statistics SET avg_wait_time = ?, calls_count = ? WHERE id = ?',
    [avg_wait_time, calls_count, id]
  );
  return { id, avg_wait_time, calls_count };
};

exports.deleteStatistic = async (id) => {
  await db.execute('DELETE FROM statistics WHERE id = ?', [id]);
};
