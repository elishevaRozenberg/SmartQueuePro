// const express = require('express');
// const router = express.Router();
// const {getAllQueues, createQueue, getQueueById, updateQueue, deleteQueue} = require('../controllers/queueController');

// router.get('/', getAllQueues);
// router.post('/', createQueue);
// router.get('/:id', getQueueById);
// router.put('/:id', updateQueue);
// router.delete('/:id', deleteQueue);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllQueues,
  createQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
  toggleQueue
} = require('../controllers/queueController');

router.get('/', getAllQueues);
router.post('/', createQueue);
router.get('/:id', getQueueById);
router.put('/:id', updateQueue);
router.delete('/:id', deleteQueue);
// מסלול חדש – הפעלת/כיבוי תור
router.put('/:id/toggle', toggleQueue);

module.exports = router;
