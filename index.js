// const express = require('express');

// const app = express();
// //use json
// app.use(express.json());

// const doctors = [
//     {
//         id : 1,
//         name: 'Dr.Rajesh',
//         department: 'Anaesthetics',
//         specialization: 6.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 2,
//         name: 'Dr.Pooja Patel',
//         department: 'Cardiology',
//         specialization: 9.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 3,
//         name: 'Dr.Sarah Smith',
//         department: 'Cardiology',
//         specialization: 16.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 4,
//         name: 'Dr.John Deo',
//         department: 'Anaesthetics',
//         specialization: 3.7,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 5,
//         name: 'Dr.Jay Soni',
//         department: 'Dentist',
//         specialization: 16.0,
//         degree: 'Masters degree',
//         contact: 260971823400 ,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 6,
//         name: 'Dr.Megha Trivedi',
//         department: 'Gynaecology',
//         specialization: 0.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 7,
//         name: 'Dr.Jacob Ryan',
//         department: 'Urology',
//         specialization: 0.2,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 8,
//         name: 'Dr.Rajesh',
//         department: 'General surgery',
//         specialization: 3.2,
//         degree: 'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 9,
//         name: 'Dr.Pooja Patel',
//         department: 'Cardiology',
//         specialization: 25.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },
//     {
//         id : 10,
//         name: 'Dr.Sarah Smith',
//         department: 'Anaesthetics',
//         specialization: 26.0,
//         degree:  'Masters degree',
//         contact: 260971823400,
//         email: 'taosam.itcontents.net',
//         joinedDate: '08-09-2023'
//     },

// ]

// //get request

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/api/doctors', (req, res) => {
//     res.send(doctors);

// })

// app.get('/api/doctors/:id', (req, res) => {
//    // res.send(req.params.id);

//     const doctor = doctors.find(course => course.id === parseInt(req.params.id));
//     if(!doctor) return res.status(404).send ('Oops, no doctor found')
//     res.send(doctor)
// })

// function validateDoctor(doctor) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//         id:Joi.required(),
//         department:Joi.required(),
//         specialization:Joi.required(),
//         degree:Joi.required(),
//         contact:Joi.required(),
//         email:Joi.required(),
//         joinedDate:Joi.required(),
//     });

//     return Joi.validate(doctor, schema);
// }

// //post requests /creating

// app.post('/api/doctors', (req, res) => {
//     // const result = validateCourse(req.body);
//     const {error} = validateDoctor(req.body);
//     //if invalid, return 400 -bad request
//     if(error) return res.status(400).send(error.details[0].message);

//    //validation
//    //  const schema = Joi.object({
//    //      name: Joi.string().min(3).required(),
//    //      content: Joi.string().required(),
//    //  });
//    //
//    //  const result = Joi.validate(req.body, schema);
//    //
//    //  if(result.error) {
//    //      res.status(400).send(result.error.details[0].message);
//    //      return;
//    //  }
//    //

//     const doctor = {
//         id: doctors.length + 1,
//         name: req.body.name,
//         department:req.body .department,
//         specialization:req.body.specialization,
//         degree: req.body.degree,
//         contact:req.body.contact,
//         email:req.body.email,
//         joinedDate:req.body.joinedDate,

//     }
//     doctors.push(doctor);
//     res.send(doctor);
// })

// //put request

// app.put('/api/doctors/:id', (req, res) => {
//     // look up the course
//     const id = req.params.id;
//     let doctor = doctors.find(course => {
//         return course.id === parseInt(id);
//     });
//     if(!doctor) return res.status(404).send ('Oops, no course found')
//     res.send(doctor)
//     //if not found return 404
//     //validation

//     // const result = validateCourse(req.body);
//     const {error} = validateDoctor(req.body);
//     //if invalid, return 400 -bad request
//     if(error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     //update course
//     doctor = {
//         id: id,
//         name: req.body.name,
//         department:req.body .department,
//         specialization:req.body.specialization,
//         degree: req.body.degree,
//         contact:req.body.contact,
//         email:req.body.email,
//         joinedDate:req.body.joinedDate,

//     }
//     res.send(doctor);
//     //return updated course

// })

// //delete request
// app.delete('/api/doctors', (req, res) => {
//     //look up the course
//     const doctor = doctors.find(course => course.id === parseInt(req.params.id));
//     if(!doctor) return res.status(404).send ('Oops, no course found')
//     res.send(doctor)
//     //not existing, return 404

//     //delete
//     const index = doctors.indexOf(doctor);
//     doctors.splice(index, 1);
//     //return the same doctor
//     res.send(doctors);
// })

// const port = process.env.PORT || 3001

// app.listen (port, (err, res) => {
//     console.log(`listening on port ${port}`)
//     if(err) return status(401).send('something went wrong :(')
// })
