// const callService = require('../services/callService');

// exports.createCall = async (req, res) => {
//   try {
//     const { queue_id, user_id } = req.body;

//     if (!queue_id || !user_id) {
//       return res.status(400).json({ message: 'Missing queue_id or user_id' });
//     }

//     const newCall = await callService.createCall({ queue_id, user_id });
//     res.status(201).json(newCall);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Error creating call' });
//   }
// };

// exports.getAllCalls = async (req, res) => {
//   try {
//     const queue_id = req.query.queue_id || null;
//     const calls = await callService.getAllCalls(queue_id);
//     res.json(calls);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Error fetching calls' });
//   }
// };

// exports.getCallById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const call = await callService.getCallById(id);
//     if (!call) {
//       return res.status(404).json({ message: 'Call not found' });
//     }
//     res.json(call);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Error fetching call' });
//   }
// };

// exports.updateCall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
//     const updatedCall = await callService.updateCall(id, updateData);
//     if (!updatedCall) {
//       return res.status(404).json({ message: 'Call not found' });
//     }
//     res.json(updatedCall);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Error updating call' });
//   }
// };

// exports.deleteCall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await callService.deleteCall(id);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message || 'Error deleting call' });
//   }
// };

// exports.completeCall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await callService.completeCall(id);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message || 'Error completing call' });
//   }
// };

// exports.cancelCall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { user_id } = req.body;

//     const result = await callService.cancelCall(id, user_id);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message || 'Error cancelling call' });
//   }
// };

exports.getCallsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const calls = await callService.getCallsByUserId(userId);
    res.json(calls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching calls by user ID' });
  }
};

const callService = require('../services/callService');
exports.getCallsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const calls = await callService.getCallsByUserId(userId);
    res.json(calls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching calls by user ID' });
  }
};
exports.createCall = async (req, res) => {
  try {
    const { queue_id, user_id } = req.body;
    if (!queue_id || !user_id) {
      return res.status(400).json({ message: 'Missing required fields: queue_id or user_id' });
    }
    const newCall = await callService.createCall({ queue_id, user_id });
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
    const { user_id } = req.body; // ניתן לקבל user_id מהטוקן במקום מהגוף
    const result = await callService.cancelCall(id, user_id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error cancelling call' });
  }
};

// קריאה למספר הבא בתור (מעבר סטטוס ל"called")
exports.callNext = async (req, res) => {
  try {
    const { queueId } = req.params;
    const updatedCall = await callService.callNext(queueId);
    if (!updatedCall) {
      return res.status(404).json({ message: 'No waiting calls' });
    }
    res.json(updatedCall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error calling next' });
  }
};


// exports.getCallsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;  // קבלת ה־userId מה־params
//     const calls = await callService.getCallsByUserId(userId);  // קריאה לשירות לשלוף את הקריאות
//     if (!calls || calls.length === 0) {
//       return res.status(404).json({ message: 'No calls found for this user' });
//     }
//     res.json(calls);  // מחזירים את הקריאות
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching calls for the user' });
//   }
// };