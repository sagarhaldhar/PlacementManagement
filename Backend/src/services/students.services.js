const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config("../../env");
const StudentModel = require('../models/student.model');
const ApiError = require('../utils/ApiError');
const statusCodes = require("http-status-codes");
const { json } = require('body-parser');

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
        throw new ApiError(error.message);
    }
}

const loginStudent = async (req) => {
    const { email ,password } = req.body;
    const student = await StudentModel.findOne({ email });
    if(!student){
        return json({ message : "Student not found"});
    };
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if(!isPasswordValid){
        return json({ message : "Invalid password"});
    };
    const toknData = {
        studId : student._id,
    };
    const token = jwt.sign(toknData, process.env.JWT_SECRET, { expiresIn : "1d" });
    if(!token){
        return json({ message : "Token not generated"});
    };
    console.log("student logged in successfully : ", student);  
    return token;
}
module.exports = {
    registerStudent,
    loginStudent
}