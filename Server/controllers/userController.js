const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const { username, email, full_name, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required field' });
    }

    const role = req.body.role || 'Client';
    const passwordHash = bcrypt.hashSync(password, 10);

    const newUserId = await userModel.createUser({
      username,
      email,
      full_name,
      passwordHash,
      role
    });

    // שמירה בסשן
    req.session.user = {
      id: newUserId,
      username,
      email,
      role
    };

    // החזרה ל-Frontend
    res.status(201).json({
      id: newUserId,
      username,
      email,
      role
    });

  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body || {};

    if (Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const updatedUser = await userModel.updateUser(id, newData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or nothing to update' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};


// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userModel.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};


exports.getByPasswordAndUserName = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing username or password",
      });
    }

    const user = await userModel.getUserByPasswordAndUserName(username);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist in the system. Please sign up first.",
      });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "The password or username is incorrect",
      });
    }

    // הגדרת ברירת מחדל לתפקיד אם חסר
    if (!user.role) {
      user.role = "Client";
    }

    // הסרת הסיסמה לפני החזרה
    const { password: _password, ...userWithoutPassword } = user;

    // שמירת המשתמש בסשן
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // החזרת פרטי המשתמש ללא הסיסמה
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};
