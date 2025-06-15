const callModel = require('../models/callModel');
const clock = require('../utils/clock'); // וודאי שיש clock.now()

class CallService {
  // יצירת קריאה חדשה (הזמנת תור) - שימוש באטומיות ומניעת כפילויות
  async createCall({ queue_id, user_id }) {
    if (!queue_id) {
      throw new Error('Missing queue_id');
    }
    if (!user_id) {
      throw new Error('Missing user_id');
    }

    // בדיקה אם למשתמש כבר יש תור פתוח באותו queue
    const existingCall = await callModel.getUserOpenCallInQueue(user_id, queue_id);
    if (existingCall) {
      throw new Error('You already have an open call in this queue');
    }

    // בדיקה אם למשתמש כבר יש תור ביום הנוכחי (מגבלה: תור אחד ביום)
    const hasCallToday = await callModel.userHasCallToday(user_id);
    if (hasCallToday) {
      throw new Error('You cannot book more than one call per day');
    }

    // יצירת התור בצורה אטומית
    const newCall = await callModel.createCallAtomic(queue_id, user_id, clock);

    return newCall;
  }

  // שליפת כל הקריאות, לפי תור אם סופק
  async getAllCalls(queue_id = null) {
    if (queue_id) {
      return await callModel.getCallsByQueue(queue_id);
    }
    return await callModel.getAllCalls();
  }

  // שליפת כל הקריאות של משתמש ספציפי
  async getCallsByUser(user_id) {
    return await callModel.getCallsByUser(user_id);
  }

  // קריאה למספר הבא בתור (מעבר ל"called")
  async callNext(queue_id) {
    if (!queue_id) throw new Error('Missing queue_id');

    const nextCall = await callModel.getNextWaitingCall(queue_id);
    if (!nextCall) return null;

    const updatedCall = await callModel.updateCall(nextCall.id, {
      queue_id: nextCall.queue_id,
      number: nextCall.number,
      user_id: nextCall.user_id,
      status: 'called',
      called_at: clock.now(),
      served_at: nextCall.served_at
    });

    return updatedCall;
  }

  // עדכון קריאה לפי מזהה
  async updateCall(id, updateData) {
    const call = await callModel.getCallById(id);
    if (!call) throw new Error('Call not found');

    const updatedCall = await callModel.updateCall(id, {
      queue_id: updateData.queue_id || call.queue_id,
      number: updateData.number || call.number,
      user_id: updateData.user_id || call.user_id,
      status: updateData.status || call.status,
      called_at: updateData.called_at || call.called_at,
      served_at: updateData.served_at || call.served_at
    });

    return updatedCall;
  }

  // סיום תור - סמן סטטוס ל-'done' והצב served_at
  async completeCall(id) {
    const call = await callModel.getCallById(id);
    if (!call) throw new Error('Call not found');

    if (call.status === 'done') {
      throw new Error('Call already completed');
    }

    const completedCall = await callModel.updateCall(id, {
      ...call,
      status: 'done',
      served_at: clock.now()
    });

    return completedCall;
  }

  // ביטול תור (עדכון סטטוס ל-'cancelled')
  async cancelCall(id, user_id) {
    const call = await callModel.getCallById(id);
    if (!call) throw new Error('Call not found');

    if (call.user_id !== user_id) {
      throw new Error('You do not have permission to cancel this call');
    }

    if (call.status === 'cancelled' || call.status === 'done') {
      throw new Error('Cannot cancel a call that is already cancelled or completed');
    }

    const cancelledCall = await callModel.updateCall(id, {
      ...call,
      status: 'cancelled'
    });

    return cancelledCall;
  }

  // מחיקת קריאה לפי מזהה (למשל מנהל בלבד)
  async deleteCall(id) {
    const call = await callModel.getCallById(id);
    if (!call) throw new Error('Call not found');

    await callModel.deleteCall(id);
    return { message: 'Call deleted successfully' };
  }

  // בתוך CallService
  async getCallById(id) {
    const call = await callModel.getCallById(id);
    return call;
  }

}

module.exports = new CallService();
