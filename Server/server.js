const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
const callRoutes = require('./routes/callRoutes');  
const statisticsRoutes = require('./routes/statisticsRoutes');
const SignUpRoute = require('./routes/signUpRoute');
const SignInRoute = require('./routes/signInRoute');
const mysql = require('mysql2');  
const PORT = process.env.PORT || 3000;

// // חיבור למסד הנתונים
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'elisheva',  // סיסמה לדוגמה, כדאי לעבור ל-.env
//   database: 'SmartQueuePro'
// });






app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/calls', callRoutes); 
app.use('/api/statistics', statisticsRoutes);
app.use('/api/users', SignUpRoute);
app.use('/api/users', SignInRoute);


// // בדיקה שחיבור ל-DB תקין
// con.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     process.exit(1);
//   }
//   console.log('Connected to MySQL database');
// });

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
