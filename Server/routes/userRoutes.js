const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, getUserById, updateUser, deleteUser} = require('../controllers/userController');
const { checkEmail, checkPassword, checkUserExists } = require("../middlewares/verification");

router.get('/', getAllUsers);
router.post('/',checkEmail, checkPassword,checkUserExists, createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
