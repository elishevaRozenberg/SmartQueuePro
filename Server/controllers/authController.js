// const userModel = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret_key';  // להוציא לקובץ סביבה

// // רישום משתמש חדש
// exports.register = async (req, res) => {
//   try {
//     const { username, email, full_name, password } = req.body;

//     if (!username || !password || !email) {
//       return res.status(400).json({ message: 'Username, email and password are required' });
//     }

//     const existingUser = await userModel.getUserByUsername(username);
//     if (existingUser) {
//       return res.status(409).json({ message: 'Username already exists' });
//     }

//     const password_hash = await bcrypt.hash(password, 10);

//     // צור משתמש במסד
//     const newUserId = await userModel.createUser({
//       username,
//       email,
//       full_name,
//       passwordHash: password_hash,
//       role: 'client'
//     });

//     const user = await userModel.getUserById(newUserId);

//     // צור טוקן JWT
//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     const { password_hash: _, ...userData } = user;

//     res.status(201).json({ token, user: userData });

//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: error.message || 'Registration failed' });
//   }
// };

// // התחברות משתמש קיים
// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: 'Username and password are required' });
//     }

//     const user = await userModel.getUserByUsername(username);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     const { password_hash: _, ...userData } = user;
//     res.json({ token, user: userData });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: error.message || 'Login failed' });
//   }
// };

// // שליפת פרטי המשתמש המחובר
// exports.getMe = async (req, res) => {
//   try {
//     const user = await userModel.getUserById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const { password_hash: _, ...userData } = user;
//     res.json(userData);

//   } catch (error) {
//     console.error('GetMe error:', error);
//     res.status(500).json({ message: error.message || 'Failed to get user info' });
//   }
// };

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

// Login - /api/auth/login
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

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    const { password_hash: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
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