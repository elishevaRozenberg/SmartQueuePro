const express = require('express');
const router = express.Router();
const {getAllCalls, createCall, getCallById, updateCall, deleteCall} = require('../controllers/callController');

router.get('/', getAllCalls);
router.post('/', createCall);
router.get('/:id', getCallById);
router.put('/:id', updateCall);
router.delete('/:id', deleteCall);

module.exports = router;
