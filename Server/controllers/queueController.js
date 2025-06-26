const queueService = require('../services/queueService');
const pool = require('../../db/connection');

exports.createQueue = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Missing required field: name' });
    }
    const newQueue = await queueService.createQueue({ name, description, location });
    res.status(201).json(newQueue);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error creating queue' });
  }
};

exports.getAllQueues = async (req, res) => {
  try {
    const queues = await queueService.getAllQueues();
    res.json(queues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching queues' });
  }
};

exports.getQueueById = async (req, res) => {
  try {
    const { id } = req.params;
    const queue = await queueService.getQueueById(id);
    res.json(queue);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message || 'Queue not found' });
  }
};

exports.updateQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    const updatedQueue = await queueService.updateQueue(id, { name, description, location });
    res.json(updatedQueue);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error updating queue' });
  }
};

exports.deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;
    await queueService.deleteQueue(id);
    res.json({ message: 'Queue deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error deleting queue' });
  }
};

// הפעלת/השבתת תור (היפוך is_active)
exports.toggleQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(`UPDATE queues SET is_active = NOT is_active WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    const updatedQueue = await queueService.getQueueById(id);
    res.json(updatedQueue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error toggling queue status' });
  }
};
