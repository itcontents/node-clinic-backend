const Joi = require("joi");
const pool = require("../db/db");
//data validation on create

const appointmentSchema = Joi.object({
  title: Joi.string().min(3).required(),
  doctor: Joi.string().min(2).required(),
  full_name: Joi.string().min(6).required(),
  first_name: Joi.string().min(6).required(),
  last_name: Joi.string().min(6).required(),
  appointment_date: Joi.string().min(6).required(),
  status: Joi.string().min(6).required(),
  contact: Joi.string().min(6).required(),
  other_info: Joi.string().min(6).required(),
  time_from: Joi.string().min(6).required(),
  time_to: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  conditions: Joi.string().min(3).required(),
  therapy_date: Joi.date().required(),
  address: Joi.string().min(6).required(),
  age: Joi.number().integer().min(1).required(),
  notes: Joi.string().min(6).required(),
});

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
          id, title, doctor, full_name, first_name, last_name, appointment_date,
          status, contact, other_info, time_from, time_to, email, conditions,
          therapy_date, address, age, notes
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

const updateById = async (req, res) => {};
const getAllAppointments = async (req, res) => {
pool.query("SELECT * FROM appointments", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Appointments:", results);
    res.json(results);
    // Process the retrieved data here
  });
};
const getAppointmentById = async (req, res) => {
  res.json({ username: "john_doe", email: "john@example.com" });
};
const deleteAppointment = async (req, res) => {
  res.json({ username: "john_doe", email: "john@example.com" });
};

module.exports = {
  createAppointment,
  updateById,
  getAllAppointments,
  getAppointmentById,
  deleteAppointment,
};