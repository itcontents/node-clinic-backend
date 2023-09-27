const express = require('express');
const router = express.Router();

const {
    makePayment,
    getAllPayments,
    getPayment,
    returnPayment,
} = require("../controllers/paymentsController");

router.route('/capture-payments').post(makePayment);
router.route('/').get(getAllPayments);
router.route('/:id').get(getPayment);
router.route('/return-payments/:id').put(returnPayment)


module.exports = router;
