const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');

router.get('/', callController.getAllCalls);
router.post('/', callController.createCall);
router.get('/:id', callController.getCallById);
router.put('/:id', callController.updateCall);
router.delete('/:id', callController.deleteCall);

module.exports = router;
