const Joi = require("joi");
const pool = require("../db/db");
//data validation on create

const paymentSchema = {
    patients_id: Joi.number().required(),
    patients: Joi.date().required(),
    assigned_doctor: Joi.number().required(),
    payment_date: Joi.number().required(),
    charge: Joi.number().required(),
    tax: Joi.number().required(),
    discount: Joi.number().required(),
    total: Joi.number().required(),
    reason: Joi.number().required(),

}

const makePayment = async (req, res) => {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }else {
        const paymentData = {
            patients_id: req.body.patients_id,
            patient: req.body.patients,
            assigned_doctor: req.body.assigned_doctor,
            payment_date: req.body.payment_date,
            charge: req.body.charge,
            tax: req.body.tax,
            discount: req.body.discount,
            total: req.body.total,
            reason: req.body.reason,
        };


        try {
            const query = `INSERT INTO payments (id, patient, assigned_doctor, payment_date,charge,tax,discount,total,reason)
            VALUES ( uuid(),?,?,?,?,?,?,?,?,? )`;

            const values = [
                paymentData.patients_id,
                paymentData.patient,
                paymentData.assigned_doctor,
                paymentData.payment_date,
                paymentData.charge,
                paymentData.tax,
                paymentData.discount,
                paymentData.total,
                paymentData.reason

            ];

            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error("Error executing query:", error);
                    res.status(500).json({ error: error });
                } else {
                    res.json({
                        message: "payment captured successfully",
                        data: paymentData,
                    });
                }
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


};

const getAllPayments = async (req, res) => {
    try {
        const query = `SELECT * FROM payments`;

        pool.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                res.status(500).json({ error: error });
            } else {
                res.json({
                    message: "payments fetched successfully",
                    data: results,
                });
            }
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getPayment = async (req, res) => {
    const paymentId = req.params.id;
    try{
        const query = `SELECT * FROM payments WHERE id = ${paymentId}`;

        await pool.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                res.status(500).json({error: error});
            } else {
                res.json({
                    message: "payment fetched successfully",
                    data: results,
                });
            }
        })
    }catch (error) {

    }
};

const returnPayment = async (req, res) => {
    const paymentId = req.params.id;
    try{
        console.log(PaymentId)
        // const query = `UPDATE payments SET - WHERE id = ${paymentId}`;

        // await pool.query(query, (error, results) => {
        //     if (error) {
        //         console.error("Error executing query:", error);
        //         res.status(500).json({error: error});
        //     } else {
        //         res.json({
        //             message: "payment returned successfully",
        //             data: results,
        //         });
        //     }
        // })
    }catch (error) {

    }
};

















module.exports = {
    makePayment,
    getAllPayments,
    getPayment,
    returnPayment,

};