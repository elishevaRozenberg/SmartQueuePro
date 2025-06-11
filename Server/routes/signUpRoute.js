const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { checkEmail, checkPassword, checkUserExists } = require("../middlewares/verification");

router.use(express.json());

router.post("/signup",  checkEmail, checkPassword,checkUserExists, createUser);

module.exports = router;
