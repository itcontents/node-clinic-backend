const express = require("express");
const router = express.Router();


const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointment,
  updateById,
} = require("../controllers/appointmentsController");

router.route("/create").post(createAppointment);
router.route("/:id").put(updateById);
router.route("/").get(getAllAppointments);
router.route("/:id").get(getAppointmentById);
router.route("/:id").delete(deleteAppointment);



module.exports = router;