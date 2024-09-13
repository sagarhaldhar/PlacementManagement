const express = require('express');
const router = express.Router();
const { registerValidation } = require('../validations/student.validations');
const { registerController } = require('../controller/students.controller');
const validate = require('../middlewares/validater');


// Register students
router.route('/register').post(validate(registerValidation),registerController);

module.exports = router;