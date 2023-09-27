// Controllers: These handle the logic for different routes and interact with services to process requests.
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

// Define a Joi schema for user registration input validation
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// {
//   'username':'Taosam',
//   'email':'info@itc.com',
// }'password':568786,

const userRegistration = async (req, res) => {
  const { error } = userSchema.validate(req.body);
 
  if (error) {
    // Handle validation error
    res.status(400).json({ error: error.details[0].message });
  } else {
    // Proceed with user registration logic
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const query =
        "INSERT INTO users (id,username, email, password) VALUES (uuid(),?, ?, ?)";
      const values = [userData.username, userData.email, userData.password];

      // Use a parameterized query to insert data safely
      pool.query(query, values, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: error });
        } else {
          res.json({ message: "User registered successfully", user: userData });
        }
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: error });
    }
  }
};


const login = (req, res) => {
  // Get the provided username and password from the request body
  const { username, password } = req.body;

  // Find a user in the array whose credentials match the provided ones
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // If valid, generate an authentication token (e.g., JWT) for the user.
    const token = jwt.sign({ username }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Return the token as a response.
    res.json({ message: "User logged in successfully", token });
  } else {
    // If no matching user is found, return an error response.
    res.status(401).json({ error: "Invalid credentials" });
  }
};

const getAllUsers = async (req, res) => {
  try{
    const query = "SELECT * FROM users";
    const result = await pool.query(query, (err, result) => {
      if(err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: error });
        return;
      }else {
        console.log("Users:", results);
        res.json(results);
      }
    });
  }catch(err){

  }
};

const getUser = async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE id =?";
    const user = await pool.query(query, [req.params.id], (error, result) => {
      if(error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
        return;
      }else {
        console.log("User:", user);
        res.json(user);
      }
    });
  }catch(err){

  }
};

module.exports = { getAllUsers, getUser, userRegistration, login };
