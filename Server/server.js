const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');
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
