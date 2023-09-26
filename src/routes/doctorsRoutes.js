const express = require('express');
const router = express.Router();


const {
    createDoctor,
    updateDoctor,
    getAllDoctors,
    getDoctorById,
    deleteDoctor
} = require("../controllers/doctorsController");


//route to create a new doctor
router.route('/create').post(createDoctor);
router.route('/:id').put(updateDoctor);
router.route('/').get(getAllDoctors);
router.route('/:id').get(getDoctorById);
router.route('/:id').delete(deleteDoctor);

module.exports = router;
