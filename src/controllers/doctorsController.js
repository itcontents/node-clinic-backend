const Joi = require("joi");
const pool = require("../db/db");

const doctorSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  doctors_handle: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  department: Joi.string().required(),
  gender: Joi.string().required(),
  contact: Joi.number().required(),
  dob: Joi.date().required(),
  address: Joi.string().required(),
  medical_condition: Joi.string(),
  profile_picture: Joi.string(), //check later
  education_info: Joi.string(),
  joined_date: Joi.date().required(),
  is_available: Joi.boolean().required(),
  archive: Joi.boolean().required(),
});

const createDoctor = async (req, res) => {
  const { error } = doctorSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    const doctorsData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      doctors_handle: req.body.doctors_handle,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
      gender: req.body.gender,
      contact: req.body.contact,
      dob: req.body.dob,
      address: req.body.address,
      medical_condition: req.body.medical_condition,
      profile_picture: req.body.profile_picture,
      education_info: req.body.education_info,
      joined_date: req.body.joined_date,
      is_available: req.body.is_available,
      archive: req.body.archive,
    };

    try {
      const query = `INSERT INTO doctors (id,first_name, last_name, doctors_handle,email,password,department,gender,contact,dob,address,medical_condition,profile_picture,education_info,joined_date,is_available,archive)
            VALUES(UUID(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
`;
      const values = [
        doctorsData.first_name,
        doctorsData.last_name,
        doctorsData.doctors_handle,
        doctorsData.email,
        doctorsData.password,
        doctorsData.department,
        doctorsData.gender,
        doctorsData.contact,
        doctorsData.dob,
        doctorsData.address,
        doctorsData.medical_condition,
        doctorsData.profile_picture,
        doctorsData.education_info,
        doctorsData.joined_date,
        doctorsData.is_available,
        doctorsData.archive,
      ];

      pool.query(query, values, (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: error });
        } else {
          res.json({
            message: "doctor created successfully",
            data: doctorsData,
          });
        }
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: error });
    }
  }
};

//

const updateDoctor = (req, res) => {
  const doctorsId = req.params.id;
  console.log(doctorsId);

    const doctorsData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      doctors_handle: req.body.doctors_handle,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
      gender: req.body.gender,
      contact: req.body.contact,
      dob: req.body.dob,
      address: req.body.address,
      medical_condition: req.body.medical_condition,
      profile_picture: req.body.profile_picture,
      education_info: req.body.education_info,
      joined_date: req.body.joined_date,
      is_available: req.body.is_available,
      archive: req.body.archive,
    };

    try {
        const query = `
        UPDATE doctors SET 
        first_name = ?, 
        last_name = ?, 
        doctors_handle = ?, 
        email = ?,
        password = ?,
        department = ?,
        gender = ?,
        contact = ?,
        dob = ?,
        address = ?,
        medical_condition = ?,
        profile_picture = ?,
        education_info = ?,
        joined_date = ?,
        is_available = ?,
        archive = ?
        WHERE id = ?
      `;

      const values = [
          doctorsData.first_name,
          doctorsData.last_name,
          doctorsData.doctors_handle,
          doctorsData.email,
          doctorsData.password,
          doctorsData.department,
          doctorsData.gender,
          doctorsData.contact,
          doctorsData.dob,
          doctorsData.address,
          doctorsData.medical_condition,
          doctorsData.profile_picture,
          doctorsData.education_info,
          doctorsData.joined_date,
          doctorsData.is_available,
          doctorsData.archive,
          doctorsId,

      ]

      pool.query(query,values, (error, results) => {
          if(error) {
              console.error("Error executing query:", error);
              res.status(500).json({ error: error });
          }else {
              res.json({
                  message: "Doctor updated successfully",
                  data: doctorsData,
              })
          }
      });

    } catch (error) {
        console.error("Error updating Doctor:", error);
        res.status(500).json({ error: error });
    }

};
//getAllDoctors
const getAllDoctors = async (req, res) => {
  pool.query("SELECT * FROM doctors", (error , results) => {
      if (error) {
          console.error("Error executing query:", error);
          return;
      }else {
          console.log("doctors:", results);
          res.json(results);
          // Process the retrieved data here
      }
  })
};

//getDoctor
const getDoctorById = async (req, res) => {
    const doctorsId = req.params.id; // Extract the doctor ID from the URL
    console.log("Doctor ID:", doctorsId); // Add this line for debugging
    try {
        // Define the SQL query to select the doctor by ID
        const query = `
            SELECT * FROM doctors
            WHERE id = ?`;

        // Use a parameterized query to retrieve the doctor
        pool.query(query, [doctorsId], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                res.status(500).json({ error: error });
            } else {
                if (results.length === 0) {
                    // If no doctor with the given ID is found, return a 404 response
                    res.status(404).json({ message: "Doctor not found" });
                } else {
                    // If the doctor is found, return it in the response
                    res.json({ doctor: results[0] });
                }
            }
        });
    } catch (error) {
        console.error("Error retrieving doctor:", error);
        res.status(500).json({ error: error });
    }
};


//deleteDoctor
const deleteDoctor = async (req, res) => {
 const doctorsId = req.params.id;

    try {
        const query = ` DELETE FROM doctors WHERE id = ?`;

        pool.query(query, [doctorsId], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                res.status(500).json({error: error});
            } else {
                res.json({message: "Appointment deleted successfully"});
            }
        });
    }catch (error){
        console.error("Error deleting appointment:", error);
        res.status(500).json({ error: error });
    }
};

module.exports = {
  createDoctor,
  updateDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
};
