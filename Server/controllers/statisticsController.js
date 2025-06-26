
// statisticsController.js
const statisticsModel = require('../models/statisticsModel');

exports.createStatistic = async (req, res) => {
  try {
    const { queue_id, date, avg_wait_time, calls_count } = req.body;

    if (!queue_id || !date) {
      return res.status(400).json({ message: 'Missing required fields: queue_id and date' });
    }

    const newStatistic = await statisticsModel.createStatistic({
      queue_id,
      date,
      avg_wait_time,
      calls_count
    });

    res.status(201).json(newStatistic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating statistic' });
  }
};

exports.getAllStatistics = async (req, res) => {
  try {
    const statistics = await statisticsModel.getAllStatistics();
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

exports.getStatisticById = async (req, res) => {
  try {
    const stat = await statisticsModel.getStatisticById(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Statistic not found' });
    res.json(stat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving statistic' });
  }
};

exports.updateStatistic = async (req, res) => {
  try {
    const updated = await statisticsModel.updateStatistic(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating statistic' });
  }
};

exports.deleteStatistic = async (req, res) => {
  try {
    await statisticsModel.deleteStatistic(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting statistic' });
  }
};
