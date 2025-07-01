const mysql = require('mysql2');

// Update these values with your actual MySQL credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // replace with your MySQL password
  database: 'student_teacher_appointments' // replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database.');
  }
});

module.exports = db;