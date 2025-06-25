const express = require('express');
const router = express.Router();
const { register, login, getMe,getByPasswordAndUserName } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/signin', getByPasswordAndUserName);

module.exports = router;
