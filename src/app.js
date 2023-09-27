const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express(() => {
  console.log(`Server is running`);
});

// Use the cors() middleware to disable CORS
app.use(cors());

// Import configuration
// require('./config/.env'); // Load environment variables

// Import middleware
app.use(bodyParser.json()); //  middleware

// Import routes
const userRoutes = require("./routes/userRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const doctorsRoutes = require("./routes/doctorsRoutes");
const patientRoutes = require("./routes/patientRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/payments", paymentsRoutes);

// Start the server/profile
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
