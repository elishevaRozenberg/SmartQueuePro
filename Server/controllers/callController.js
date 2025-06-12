const callModel = require('../models/callModel');

exports.createCall = async (req, res) => {
  try {
    const { queue_id, number, user_id, status } = req.body;
    if (!queue_id || !number) {
      return res.status(400).json({ message: 'Missing required fields: queue_id or number' });
    }

    const newCall = await callModel.createCall({ queue_id, number, user_id, status });
    res.status(201).json(newCall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating call' });
  }
};

exports.getAllCalls = async (req, res) => {
  try {
    const calls = await callModel.getAllCalls();
    res.json(calls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching calls' });
  }
};

exports.getCallById = async (req, res) => {
  try {
    const { id } = req.params;
    const call = await callModel.getCallById(id);
    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching call' });
  }
};

exports.updateCall = async (req, res) => {
  try {
    const { id } = req.params;
    const { queue_id, number, user_id, status, called_at, served_at } = req.body;

    const updatedCall = await callModel.updateCall(id, { queue_id, number, user_id, status, called_at, served_at });
    if (!updatedCall) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(updatedCall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating call' });
  }
};

exports.deleteCall = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await callModel.deleteCall(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json({ message: 'Call deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting call' });
  }
};
