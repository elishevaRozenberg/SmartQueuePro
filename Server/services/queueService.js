const queueModel = require('../models/queueModel');

exports.createQueue = async ({ name, description, location }) => {
  if (!name || typeof name !== 'string' || name.length < 2) {
    throw new Error('שם התור לא תקין');
  }

  // לבדוק אם תור בשם זה כבר קיים
  const allQueues = await queueModel.getAllQueues();
  const nameExists = allQueues.some(q => q.name.toLowerCase() === name.toLowerCase());

  if (nameExists) {
    throw new Error('תור בשם זה כבר קיים');
  }

  return queueModel.createQueue({ name, description, location });
};

exports.getAllQueues = async () => {
  return queueModel.getAllQueues();
};

exports.getQueueById = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error('ID לא תקין');
  }

  const queue = await queueModel.getQueueById(id);
  if (!queue) {
    throw new Error('תור לא נמצא');
  }

  return queue;
};

exports.updateQueue = async (id, data) => {
  const queue = await queueModel.getQueueById(id);
  if (!queue) {
    throw new Error('תור לא נמצא');
  }

  // אופציונלי: לא מאפשרים לשנות שם לתור ספציפי (למשל system queue)
  if (queue.name === 'Main Queue' && data.name && data.name !== 'Main Queue') {
    throw new Error('לא ניתן לשנות את שם התור הראשי');
  }

  return queueModel.updateQueue(id, data);
};

const queueModel = require('../models/queueModel');
const callModel = require('../models/callModel'); // בהנחה שיש לך כזה

exports.deleteQueue = async (id) => {
  const queue = await queueModel.getQueueById(id);
  if (!queue) {
    throw new Error('תור לא נמצא');
  }

  // בדיקה: לא למחוק תור אם יש לו קריאות פעילות
  const relatedCalls = await callModel.getCallsByQueueId(id);
  if (relatedCalls.length > 0) {
     throw new Error('לא ניתן למחוק תור שיש לו קריאות פעילות');
  }

  return queueModel.deleteQueue(id);
};

