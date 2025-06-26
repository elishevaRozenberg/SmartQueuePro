const pool = require('../../db/connection');

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
  const userId = req.params.id ? parseInt(req.params.id) : null;

  if (!username && !email) {
    return next(); // אין שדות לבדוק
  }

  try {
    const queryParts = [];
    const values = [];

    if (username) {
      queryParts.push("username = ?");
      values.push(username);
    }
    if (email) {
      queryParts.push("email = ?");
      values.push(email);
    }

    const query = `SELECT id, username, email FROM users WHERE ${queryParts.join(' OR ')}`;
    const [rows] = await pool.execute(query, values);

    const filtered = userId ? rows.filter(user => user.id !== userId) : rows;

    if (filtered.length > 0) {
      const taken = {
        username: username && filtered.some(u => u.username === username),
        email: email && filtered.some(u => u.email === email),
      };

      let message = '';
      if (taken.username && taken.email) message = 'User already in use';
      else if (taken.username) message = 'Username already exists';
      else message = 'User already exists';

      return res.status(400).json({ message });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const checkEmailIfExists = (req, res, next) => {
  const { email } = req.body;

  if (typeof email !== 'undefined') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
  }

  next();
};


module.exports = {
  checkEmail,
  checkPassword,
  checkUserExists,
  checkEmailIfExists
};
