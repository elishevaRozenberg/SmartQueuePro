const callService = require('../services/callService');

exports.createCall = async (req, res) => {
  try {
    const { queue_id, number, user_id, status } = req.body;
    if (!queue_id || !number) {
      return res.status(400).json({ message: 'Missing required fields: queue_id or number' });
    }

    const newCall = await callService.createCall({ queue_id, number, user_id, status });
    res.status(201).json(newCall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error creating call' });
  }
};

exports.getAllCalls = async (req, res) => {
  try {
    const queue_id = req.query.queue_id || null;
    const calls = await callService.getAllCalls(queue_id);
    res.json(calls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching calls' });
  }
};

exports.getCallById = async (req, res) => {
  try {
    const { id } = req.params;
    const call = await callService.getCallById(id);
    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching call' });
  }
};

exports.updateCall = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCall = await callService.updateCall(id, updateData);
    if (!updatedCall) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(updatedCall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error updating call' });
  }
};

exports.deleteCall = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await callService.deleteCall(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error deleting call' });
  }
};

exports.completeCall = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await callService.completeCall(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error completing call' });
  }
};
exports.cancelCall = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body; // אפשר גם לקחת את זה מה-token אם יש auth

    const result = await callService.cancelCall(id, user_id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error cancelling call' });
  }
};
