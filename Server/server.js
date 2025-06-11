// const express = require('express');
// const session = require('express-session'); 
// const app = express();
// const userRoutes = require('./routes/userRoutes');
// const queueRoutes = require('./routes/queueRoutes');
// const callRoutes = require('./routes/callRoutes');  
// const statisticsRoutes = require('./routes/statisticsRoutes');
// const SignUpRoute = require('./routes/signUpRoute');
// const SignInRoute = require('./routes/signInRoute');
// const checkAuth = require('./middlewares/checkAuth');
// const checkAbilities = require('./middlewares/checkAbilities');


// const PORT = process.env.PORT || 3000;

// // הגדרת session - חייב להיות לפני כל route
// app.use(session({
//   secret: 'your_secret_key', // החלף למשהו חזק בייצור
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // ב־http רגיל, ב־https שנה ל־true
// }));



// app.use(express.json());
// app.use('/api/users', userRoutes);
// app.use('/api/queues', queueRoutes);
// app.use('/api/calls', callRoutes); 
// app.use('/api/statistics', statisticsRoutes);
// app.use('/api/users', SignUpRoute);
// app.use('/api/users', SignInRoute);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

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
// const emailVerify = require('./middlewares/emailVerify');
const verification = require('./middlewares/verification');

// ראוטים
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const callRoutes = require('./routes/callRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const SignUpRoute = require('./routes/signUpRoute');
const SignInRoute = require('./routes/signInRoute');

// פורט ברירת מחדל
const PORT = process.env.PORT || 3000;

// הגדרת session - חייב להיות לפני כל middleware שמשתמש ב-req.session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // החלף לסוד חזק בפרודקשן
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true בפרודקשן עם HTTPS
}));

// JSON body parser
app.use(express.json());


// app.use(emailVerify);

// הגדרת ראוטים
app.use('/api/users', userRoutes);
app.use('/api/users', SignUpRoute);
app.use('/api/users', SignInRoute);

app.use('/api/queues', queueRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/statistics', statisticsRoutes);

// אם רוצים להפעיל את המידלוורס של הרשאות באופן גלובלי, אפשר כאן:
// app.use(checkAuth);
// app.use(checkAbilities);

// טיפול בנתיב לא קיים (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
