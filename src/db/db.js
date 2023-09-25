const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost", // Replace with your MySQL server hostname
  user: "root", // Replace with your MySQL database username
  password: "3393083", // Replace with your MySQL database password
  database: "itc", // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Export the pool to use it in other parts of your application
module.exports = pool;


// const pool = require("./db"); // Import the MySQL connection pool

// async function getUserById(userId) {
//   try {
//     const [results, fields] = await pool.query(
//       "SELECT * FROM users WHERE id = ?",
//       [userId]
//     );
//     return results[0];
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error;
//   }
// }

// // Example usage
// (async () => {
//   const userId = 1; // Replace with the user ID you want to retrieve
//   try {
//     const user = await getUserById(userId);
//     console.log("User data:", user);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
