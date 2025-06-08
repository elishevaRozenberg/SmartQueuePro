const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/', statisticsController.getAllStatistics);
router.post('/', statisticsController.createStatistic);
router.get('/:id', statisticsController.getStatisticById);
router.put('/:id', statisticsController.updateStatistic);
router.delete('/:id', statisticsController.deleteStatistic);

module.exports = router;
