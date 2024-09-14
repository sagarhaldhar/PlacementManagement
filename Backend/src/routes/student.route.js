const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validations/student.validations');
const { registerController, loginController } = require('../controller/students.controller');
const validate = require('../middlewares/validater');


// Register students
router.route('/register').post(validate(registerValidation),registerController);
router.route('/login').post(validate(loginValidation),loginController);

module.exports = router;