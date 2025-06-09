const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  // שלב א: קבלת הטוקן מה-header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // צורת 'Bearer token'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // שלב ב: אימות הטוקן
    const secret = process.env.JWT_SECRET || 'yourSecretKey';
    const user = jwt.verify(token, secret);

    // שלב ג: שמירה של פרטי המשתמש בבקשה
    req.user = user;

    // ממשיכים לשלב הבא (לראוטר או middleware הבא)
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = checkAuth;
