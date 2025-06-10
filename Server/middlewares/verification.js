const pool = require('../db/connection');

const checkEmail = (req, res, next) => {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  if (!strongRegex.test(password)) {
    return res.status(400).json({
      message: "Password must include letters, numbers and special characters",
    });
  }
  next();
};

const checkUserExists = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT username, email FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (rows.length > 0) {
      const taken = {
        username: rows.some(u => u.username === username),
        email: rows.some(u => u.email === email),
      };

      let message = '';
      if (taken.username && taken.email) message = 'Username and email already exist';
      else if (taken.username) message = 'Username already exists';
      else message = 'Email already exists';

      return res.status(400).json({ message });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  checkEmail,
  checkPassword,
  checkUserExists,
};
