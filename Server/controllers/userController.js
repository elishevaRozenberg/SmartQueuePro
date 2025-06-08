// controllers/userController.js
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, full_name, role } = req.body;
    // בדיקת שדות חובה (לדוגמה)
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'חסר שדה חובה' });
    }

    // קריאה לסרוויס
    const newUser = await userService.createUser({
      username,
      email,
      password,
      full_name,
      role
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה ביצירת משתמש' });
  }
};
