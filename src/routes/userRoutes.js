const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  userRegistration,
  login,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser);

// Route for user registration
router.route("/register").post(userRegistration);

// Define a route for user login
router.route("/login").post(login);

// Define a route for user profile

module.exports = router;
