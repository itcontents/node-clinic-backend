// Routes: Define your API endpoints and route handlers.
const express = require("express");
const router = express.Router();

const {
  createPatient,
  updatePatient,
  getAllPatients,
  getPatient,
  deletePatient,
} = require("../controllers/patientController");

//create
router.route("/create").post(createPatient);
//update
router.route("/:id").put(updatePatient);
//getAll
router.route("/").get(getAllPatients);
//getPatient
router.route("/:id").get(getPatient);
//delete
router.route("/:id").delete(deletePatient);

module.exports = router;
