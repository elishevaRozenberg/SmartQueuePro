// const express = require("express");
// const router = express.Router();
// const { create } = require("../controllers/userController");
// const dynamicCheckAbilities = require("../Middlewares/dynamicCheckAbilities");
// const emailAndPasswordVerification = require("../Middlewares/emailAndPasswordVerification.js");



// router.use(express.json());

// router.post("/signup", dynamicCheckAbilities, async (req, res) => {
//   try {
//       const userRole = "client"
//     const { userName, password, email } = req.body;
  
//     if ((!userName || !password || !email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Necessary details to update the user are missing",
//       });
//     } 

//     const response = await create(userName, password, userRole="client", email);
//     res.status(201).send(response);
//   } catch (err) {
//     if (err.message === "UserName already exist")
//       res.status(400).send({ message: "UserName already exist" });
//     else res.status(500).send({ message: "Fail to fetch: " + err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const {checkEmail,checkPassword,checkUserExists} = require("../middlewares/verification.js");

router.use(express.json());

router.post("/signup", checkEmail, checkPassword,checkUserExists, async (req, res) => {
  try {
    const { username, password, email, full_name } = req.body;
    const role = "client";

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const response = await createUser({
      username,
      password,
      email,
      full_name,
      role,
    });

    res.status(201).send(response);
  } catch (err) {
    if (err.message === "UserName already exist")
      res.status(400).send({ message: "Username already exists" });
    else res.status(500).send({ message: "Failed to sign up: " + err.message });
  }
});
