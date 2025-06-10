const express = require("express");
const router = express.Router();
const { getByPasswordAndUserName } = require("../controllers/userController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// נתיב POST לכניסה
router.post("/signin", getByPasswordAndUserName);

module.exports = router;

