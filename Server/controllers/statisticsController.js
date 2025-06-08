const statisticsService = require('../services/statisticsService');

exports.createStatistic = async (req, res) => {
  try {
    const { queue_id, date, avg_wait_time, calls_count } = req.body;

    if (!queue_id || !date) {
      return res.status(400).json({ message: 'Missing required fields: queue_id and date' });
    }

    const newStatistic = await statisticsService.createStatistic({ queue_id, date, avg_wait_time, calls_count });
    res.status(201).json(newStatistic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating statistic' });
  }
};

exports.getAllStatistics = async (req, res) => {
  try {
    const statistics = await statisticsService.getAllStatistics();
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

exports.getStatisticById = async (req, res) => {
  try {
    const { id } = req.params;
    const statistic = await statisticsService.getStatisticById(id);
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.json(statistic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistic' });
  }
};

exports.updateStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    const { queue_id, date, avg_wait_time, calls_count } = req.body;

    const updatedStatistic = await statisticsService.updateStatistic(id, { queue_id, date, avg_wait_time, calls_count });
    if (!updatedStatistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.json(updatedStatistic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating statistic' });
  }
};

exports.deleteStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await statisticsService.deleteStatistic(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    res.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting statistic' });
  }
};
