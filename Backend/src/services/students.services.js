const bcrypt = require('bcrypt');
const StudentModel = require('../models/student.model');
const ApiError = require('../utils/ApiError');
const statusCodes = require("http-status-codes");

const registerStudent = async (req) => {
    try {
        const { name, email, password, phone,registrationNum, gender, course, branch, profilePic, year, batch, city ,state } = req.body;
        const studentExist = await StudentModel.findOne({ registrationNum });
        if (studentExist) {
            return 'Student already exists';
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new ApiError('Error hashing password');
        }
        const Student = new StudentModel({
            name,
            email,
            password : hashedPassword,
            phone, 
            registrationNum, 
            gender, 
            course, 
            branch, 
            profilePic, 
            year, 
            batch, 
            city,
            state
        });
        await Student.save();
        return "Student registered successfully";
    } catch (error) {
        console.log(error);
        throw new ApiError(statusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {
    registerStudent
}