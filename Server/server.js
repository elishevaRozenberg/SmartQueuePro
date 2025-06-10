const express = require('express');
const session = require('express-session'); 
const app = express();
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const callRoutes = require('./routes/callRoutes');  
const statisticsRoutes = require('./routes/statisticsRoutes');
const SignUpRoute = require('./routes/signUpRoute');
const SignInRoute = require('./routes/signInRoute');
const checkAuth = require('./middlewares/checkAuth');
const checkAbilities = require('./middlewares/checkAbilities');
const PORT = process.env.PORT || 3000;

// הגדרת session - חייב להיות לפני כל route
app.use(session({
  secret: 'your_secret_key', // החלף למשהו חזק בייצור
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ב־http רגיל, ב־https שנה ל־true
}));



app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/calls', callRoutes); 
app.use('/api/statistics', statisticsRoutes);
app.use('/api/users', SignUpRoute);
app.use('/api/users', SignInRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});