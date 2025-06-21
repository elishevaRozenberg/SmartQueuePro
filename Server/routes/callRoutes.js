const express = require('express');
const router = express.Router();
const {getAllCalls, createCall, getCallById, updateCall, deleteCall,completeCall ,cancelCall , getCallsByUserId} = require('../controllers/callController');

router.get('/', getAllCalls);
router.post('/', createCall);
router.get('/:id', getCallById);
router.put('/:id', updateCall);
router.delete('/:id', deleteCall);
router.patch('/:id', completeCall);
router.patch('/:id', cancelCall);
router.get('/user/:userId', getCallsByUserId);


module.exports = router;
