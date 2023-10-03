const Joi = require("joi");
const pool = require("../db/db");

//validation
const patientSchema = Joi.object({
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  full_name: Joi.string(),
  age: Joi.number().required(),
  address: Joi.string().min(3).required(),
  contact: Joi.number().required(),
  emergency_contact: Joi.number().required(),
  last_visit: Joi.date(),
  dob: Joi.date().required(),
  blood_pressure: Joi.string().required(),
  blood_group: Joi.string().required(),
  marital_status: Joi.string().required(),
  gender: Joi.string().required(),
  conditions: Joi.string().required(),
  sugger: Joi.string(),
  email: Joi.string().email(),
  selected_image: Joi.string(),
  terms: Joi.boolean().required(),
});

//create
const createPatient = async (req, res) => {
  const { error } = patientSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const patientData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      full_name: req.body.full_name,
      age: req.body.age,
      address: req.body.address,
      contact: req.body.contact,
      emergency_contact: req.body.emergency_contact,
      last_visit: req.body.last_visit,
      dob: req.body.dob,
      blood_pressure: req.body.blood_pressure,
      blood_group: req.body.blood_group,
      marital_status: req.body.marital_status,
      gender: req.body.gender,
      conditions: req.body.conditions,
      sugger: req.body.sugger,
      email: req.body.email,
      selected_image: req.body.selected_image,
      terms: req.body.terms,
    };

    try {
      const query = `INSERT INTO patients (id,first_name,last_name,full_name,age,address,contact,
          emergency_contact,last_visit,dob,blood_pressure,blood_group,marital_status,gender,conditions,
          sugger,email,selected_image,terms )
          VALUES(uuid(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const values = [
        patientData.first_name,
        patientData.last_name,
        patientData.full_name,
        patientData.age,
        patientData.address,
        patientData.contact,
        patientData.emergency_contact,
        patientData.last_visit,
        patientData.dob,
        patientData.blood_pressure,
        patientData.blood_group,
        patientData.marital_status,
        patientData.gender,
        patientData.conditions,
        patientData.sugger,
        patientData.email,
        patientData.selected_image,
        patientData.terms,
      ];

      pool.query(query, values, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: error });
        } else {
          res.json({
            message: "patient created successfully",
            data: patientData,
          });
        }
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: error });
    }
  }
};
//update
const updatePatient = async (req, res) => {
  const { error } = patientSchema.validate(req.body);
try{
  const patientsId = req.params.id;
  if(error){
    res.status(400).json({ error: error.details[0].message });
  }else {
    const updatedPatientData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      full_name: req.body.full_name,
      age: req.body.age,
      address: req.body.address,
      contact: req.body.contact,
      emergency_contact: req.body.emergency_contact,
      last_visit: req.body.last_visit,
      dob: req.body.dob,
      blood_pressure: req.body.blood_pressure,
      blood_group: req.body.blood_group,
      marital_status: req.body.marital_status,
      gender: req.body.gender,
      conditions: req.body.conditions,
      sugger: req.body.sugger,
      email: req.body.email,
      selected_image: req.body.selected_image,
      terms: req.body.terms,

    };

    const query = `
      UPDATE patients SET first_name = ?,last_name = ?,full_name = ?,age = ?,address = ?,contact = ?,emergency_contact = ?,last_visit = ?,
        dob = ?,blood_pressure = ?,blood_group = ?,marital_status = ?,gender = ?,conditions = ?,sugger = ?,email = ?,selected_image = ?
         WHERE id = ?    
    `;

    const values = [
      updatedPatientData.first_name,
      updatedPatientData.last_name,
      updatedPatientData.full_name,
      updatedPatientData.age,
      updatedPatientData.address,
      updatedPatientData.contact,
      updatedPatientData.emergency_contact,
      updatedPatientData.last_visit,
      updatedPatientData.dob,
      updatedPatientData.blood_pressure,
      updatedPatientData.blood_group,
      updatedPatientData.marital_status,
      updatedPatientData.gender,
      updatedPatientData.conditions,
      updatedPatientData.sugger,
      updatedPatientData.email,
      updatedPatientData.selected_image,
      patientsId
      ];

    pool.query(query, values, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
      } else {
        res.json({
          message: "Appointment updated successfully",
          data: updatedPatientData,
        });
      }
    });

  }

 }catch (error){
    console.error("Error executing query:", error);
    res.status(500).json({ error: error });
  }
};

//getAll
const getAllPatients = async (req, res) => {
  try {
    const query = `SELECT * FROM patients`;

    pool.query(query, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: error });
      } else {
        res.json({
          message: "Patients fetched successfully",
          data: results,
        });
      }
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error });
  }
};

//tByid
const getPatient = async (req, res) => {
  const patientId = req.params.id;
  try{
    const query = `SELECT * FROM patients WHERE id =?`;

     pool.query(query, [patientId], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({error: error});
      } else {
        res.json({
          message: "Patient fetched successfully",
          data: results,
        });
      }
    });
  }catch (error){
    console.error("Error executing query:", error);
    res.status(500).json({ error: error });
  }
};

//delete
const deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try{
    const query = `DELETE FROM patients WHERE id =?`;

     pool.query(query, [patientId], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({error: error});
      } else {
        res.json({
          message: "Patient deleted successfully",
          data: results,
        });
      }
    });
  }catch (error){
    console.error("Error executing query:", error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createPatient,
  updatePatient,
  getAllPatients,
  getPatient,
  deletePatient,
};
