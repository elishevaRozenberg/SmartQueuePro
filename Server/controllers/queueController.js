const queueService = require('../services/queueService');

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
    res.status(500).json({ message: 'Error creating queue' });
  }
};

exports.getAllQueues = async (req, res) => {
  try {
    const queues = await queueService.getAllQueues();
    res.json(queues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching queues' });
  }
};

exports.getQueueById = async (req, res) => {
  try {
    const { id } = req.params;
    const queue = await queueService.getQueueById(id);
    if (!queue) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    res.json(queue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching queue' });
  }
};

exports.updateQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;

    const updatedQueue = await queueService.updateQueue(id, { name, description, location });
    if (!updatedQueue) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    res.json(updatedQueue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating queue' });
  }
};

exports.deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await queueService.deleteQueue(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Queue not found' });
    }
    res.json({ message: 'Queue deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting queue' });
  }
};
