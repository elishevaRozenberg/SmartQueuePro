// // controllers/userController.js
// const userService = require('../services/userService');

// exports.createUser = async (req, res) => {
//   try {
//     const { username, email, password, full_name, role } = req.body;
//     // בדיקת שדות חובה (לדוגמה)
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: 'חסר שדה חובה' });
//     }

//     // קריאה לסרוויס
//     const newUser = await userService.createUser({
//       username,
//       email,
//       password,
//       full_name,
//       role
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'שגיאה ביצירת משתמש' });
//   }
// };


const userService = require('../services/userService');
const bcrypt = require("bcrypt");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, full_name, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required field' });
    }

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
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
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
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, full_name, role } = req.body;
    //לבדוק הרשאות
    const updatedUser = await userService.updateUser(id, { username, email, full_name, role });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
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
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};


// exports.getByPasswordAndUserName = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ message: 'Missing username or password' });
//     }

//     const result = await userService.getUserByPasswordAndUserName(username);
//     const user = result[0];

//     if (!user) {
//       return res.status(404).json({
//         message: 'User does not exist in the system.'
//       });
//     }

//     if (!user.role) {
//       user.role = 'Client';
//     }

//     const passwordMatch = bcrypt.compareSync(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'The password or username is incorrect' });
//     }

//     const { password: _password, ...userWithoutPassword } = user;
//     const abilities = defineAbilitiesFor(user.role);

//     res.json({ ...userWithoutPassword, abilities });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error authenticating user' });
//   }
// };


// exports.getByPasswordAndUserName = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({
//         message: "Missing username or password",
//       });
//     }

//     const user = await userService.getUserByPasswordAndUserName(username);

//     if (!user) {
//       return res.status(404).json({
//         message: "User does not exist in the system.",
//       });
//     }

//     if (!user.role) {
//       user.role = "Client";
//     }

//     const passwordMatch = bcrypt.compareSync(password, user.password);
//     if (!passwordMatch) {
//       return res
//         .status(401)
//         .json({ message: "The password or username is incorrect" });
//     }

//     const { password: _password, ...userWithoutPassword } = user;
//     // const abilities = defineAbilitiesFor(user.role);

//     res.json({ ...userWithoutPassword, abilities });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error authenticating user" });
//   }
// };



exports.getByPasswordAndUserName = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing username or password",
      });
    }

    const user = await userService.getUserByPasswordAndUserName(username);

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
