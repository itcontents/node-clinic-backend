const Joi = require("joi");
const pool = require("../db/db");
//data validation on create

const appointmentSchema = Joi.object({
  title: Joi.string().min(2).required(),
  doctor: Joi.string().min(2).required(),
  full_name: Joi.string().min(6).required(),
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  appointment_date: Joi.date().required(),
  status: Joi.string().min(4).required(),
  contact: Joi.number().min(10).required(),
  other_info: Joi.string().min(6).required(),
  time_from: Joi.required(),
  time_to: Joi.required(),
  email: Joi.string().email().required(),
  conditions: Joi.string().min(3).required(),
  therapy_date: Joi.date().required(),
  address: Joi.string().min(6).required(),
  age: Joi.number().required(),
  notes: Joi.string().min(6).required(),
});

//create appointment
const createAppointment = async (req, res) => {
  const { error } = appointmentSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const appointmentData = {
      title: req.body.title,
      doctor: req.body.doctor,
      full_name: req.body.full_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      appointment_date: req.body.appointment_date,
      status: req.body.status,
      contact: req.body.contact,
      other_info: req.body.other_info,
      time_from: req.body.time_from,
      time_to: req.body.time_to,
      email: req.body.email,
      conditions: req.body.conditions,
      therapy_date: req.body.therapy_date,
      address: req.body.address,
      age: req.body.age,
      notes: req.body.notes,
    };

    try {
      // SQL query with placeholders for all columns
      const query = `
    INSERT INTO appointments (
      id, title, doctor, full_name, first_name, last_name,
      appointment_date, status, contact, other_info, time_from, time_to, 
      email, conditions, therapy_date, address, age, notes
    ) 
    VALUES (
      uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;

      const values = [
        appointmentData.title,
        appointmentData.doctor,
        appointmentData.full_name,
        appointmentData.first_name,
        appointmentData.last_name,
        appointmentData.appointment_date,
        appointmentData.status,
        appointmentData.contact,
        appointmentData.other_info,
        appointmentData.time_from,
        appointmentData.time_to,
        appointmentData.email,
        appointmentData.conditions,
        appointmentData.therapy_date,
        appointmentData.address,
        appointmentData.age,
        appointmentData.notes,
      ];

      // Use a parameterized query to insert data safely
      pool.query(query, values, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: error });
        } else {
          res.json({
            message: "Appointment created successfully",
            data: appointmentData,
          });
        }
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: error });
    }
  }
};

//updating by appointments
const updateById = async (req, res) => {
  const appointmentId = req.params.id; // Extract the appointment ID from the URL

  try {
    // Extract the updated data from the request body
    const updatedAppointmentData = {
      title: req.body.title,
      doctor: req.body.doctor,
      full_name: req.body.full_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      appointment_date: req.body.appointment_date,
      status: req.body.status,
      contact: req.body.contact,
      other_info: req.body.other_info,
      time_from: req.body.time_from,
      time_to: req.body.time_to,
      email: req.body.email,
      conditions: req.body.conditions,
      therapy_date: req.body.therapy_date,
      address: req.body.address,
      age: req.body.age,
      notes: req.body.notes,
    };

    // Define the SQL query to update the appointment
    const query = `
      UPDATE appointments
      SET title = ?, doctor = ?, full_name = ?, first_name = ?, last_name = ?,
      appointment_date = ?, status = ?, contact = ?, other_info = ?, time_from = ?,
      time_to = ?, email = ?, conditions = ?, therapy_date = ?, address = ?, age = ?, notes = ?
      WHERE id = ?`;

    // Define the values to replace the placeholders in the query
    const values = [
      updatedAppointmentData.title,
      updatedAppointmentData.doctor,
      updatedAppointmentData.full_name,
      updatedAppointmentData.first_name,
      updatedAppointmentData.last_name,
      updatedAppointmentData.appointment_date,
      updatedAppointmentData.status,
      updatedAppointmentData.contact,
      updatedAppointmentData.other_info,
      updatedAppointmentData.time_from,
      updatedAppointmentData.time_to,
      updatedAppointmentData.email,
      updatedAppointmentData.conditions,
      updatedAppointmentData.therapy_date,
      updatedAppointmentData.address,
      updatedAppointmentData.age,
      updatedAppointmentData.notes,
      appointmentId, // The last value is the ID used in the WHERE clause
    ];

    // Use a parameterized query to update the appointment
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
      } else {
        res.json({
          message: "Appointment updated successfully",
          data: updatedAppointmentData,
        });
      }
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: error });
  }
};

//get all appointment

const getAllAppointments = async (req, res) => {
  pool.query("SELECT * FROM appointments", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Appointments:", results);
    res.json(results.rows);
    // Process the retrieved data here
  });
};

const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.id; // Extract the appointment ID from the URL

  try {
    // Define the SQL query to select the appointment by ID
    const query = `
      SELECT * FROM appointments
      WHERE id = ?`;

    // Use a parameterized query to retrieve the appointment
    pool.query(query, [appointmentId], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
      } else {
        if (results.length === 0) {
          // If no appointment with the given ID is found, return a 404 response
          res.status(404).json({ message: "Appointment not found" });
        } else {
          // If the appointment is found, return it in the response
          res.json({ appointment: results[0] });
        }
      }
    });
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    res.status(500).json({ error: error });
  }
};

//delete appointment from db
const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id; // Extract the appointment ID from the URL

  try {
    // Define the SQL query to delete the appointment by ID
    const query = `
      DELETE FROM appointments
      WHERE id = ?`;

    // Use a parameterized query to delete the appointment
    pool.query(query, [appointmentId], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
      } else {
        res.json({ message: "Appointment deleted successfully" });
      }
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createAppointment,
  updateById,
  getAllAppointments,
  deleteAppointment,
  getAppointmentById,
};
