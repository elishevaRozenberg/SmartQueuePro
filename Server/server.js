const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

// טען משתני סביבה מקובץ .env אם קיים
dotenv.config();

const app = express();

// מידלוורס מותאמים אישית
const checkAuth = require('./middlewares/checkAuth');
const checkAbilities = require('./middlewares/checkAbilities');
const dynamicCheckAbilities = require('./middlewares/dynamicCheckAbilities');
const verification = require('./middlewares/verification');
const auth = require('./middlewares/authMiddleware');

// ראוטים
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const callRoutes = require('./routes/callRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const SignUpRoute = require('./routes/signUpRoute');
const SignInRoute = require('./routes/signInRoute');
const authRoutes = require('./routes/authRoutes');


app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // החלף לסוד חזק בפרודקשן
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/users', SignUpRoute);
app.use('/api/users', SignInRoute);
app.use('/api/queues', queueRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/statistics', statisticsRoutes);

// טיפול בנתיב לא קיים (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
