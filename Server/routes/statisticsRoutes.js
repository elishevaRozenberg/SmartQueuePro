const express = require('express');
const router = express.Router();
const {getAllStatistics, createStatistic, getStatisticById, updateStatistic, deleteStatistic} = require('../controllers/statisticsController');

router.get('/',getAllStatistics);
router.post('/', createStatistic);
router.get('/:id', getStatisticById);
router.put('/:id', updateStatistic);
router.delete('/:id', deleteStatistic);

module.exports = router;
