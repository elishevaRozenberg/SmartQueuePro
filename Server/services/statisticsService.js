const statisticsModel = require('../models/statisiticsModel');

exports.createStatistic = async ({ queue_id, date, avg_wait_time, calls_count }) => {
  if (!queue_id || !date) {
    throw new Error('Missing required fields: queue_id and date');
  }

  // כאן אפשר להוסיף ולידציות נוספות בעתיד, למשל לבדוק אם התור קיים במערכת

  return await statisticsModel.createStatistic({ queue_id, date, avg_wait_time, calls_count });
};

exports.getAllStatistics = async () => {
  return await statisticsModel.getAllStatistics();
};

exports.getStatisticById = async (id) => {
  const statistic = await statisticsModel.getStatisticById(id);
  if (!statistic) {
    throw new Error('Statistic not found');
  }
  return statistic;
};

exports.updateStatistic = async (id, { queue_id, date, avg_wait_time, calls_count }) => {
  const updated = await statisticsModel.updateStatistic(id, { queue_id, date, avg_wait_time, calls_count });
  if (!updated) {
    throw new Error('Statistic not found');
  }
  return updated;
};

exports.deleteStatistic = async (id) => {
  const deleted = await statisticsModel.deleteStatistic(id);
  if (!deleted) {
    throw new Error('Statistic not found');
  }
  return true;
};
