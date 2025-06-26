const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret_key';

// Register - /api/auth/register
exports.register = async (req, res) => {
  try {
    const { username, email, full_name, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    const existing = await userModel.getUserByUsername(username);
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUserId = await userModel.createUser({ username, email, full_name, passwordHash: password_hash, role: 'client' });
    const user = await userModel.getUserById(newUserId);

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { password_hash: _, ...userData } = user;
    res.status(201).json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await userModel.getUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const { password_hash: _, ...userData } = user;
    res.json(userData);  // לא שולחים טוקן, רק את פרטי המשתמש
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};


// Get current user - /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password_hash: _, ...userData } = user;
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get user info' });
  }
};
// userController.js

exports.getByPasswordAndUserName = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    // קריאה לפונקציה שמחזירה את המשתמש לפי שם המשתמש
    const user = await userModel.getUserByPasswordAndUserName(username);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist in the system. Please sign up first.' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'The password or username is incorrect' });
    }

    // הגדרת ברירת מחדל לתפקיד אם חסר
    if (!user.role) {
      user.role = 'Client';
    }

    // הסרת הסיסמה לפני החזרה
    const { password: _password, ...userWithoutPassword } = user;

    // שמירת המשתמש בסשן
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
};
