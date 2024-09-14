const { registerStudent, loginStudent } = require("../services/students.services")


const registerController = async (req,res) => {
   try {
    const action = await registerStudent(req);
    if (action) {
        res.status(201).json({ message : action });  
    }
    else {
        res.status(400).json({ message : action});
    }
   } catch (error) {
    console.log(error);  
    res.status(500).json({ message : "Something went wrong" });
   }
};

const loginController = async (req,res) => {
    try {
    const result = await loginStudent(req);
    if (result) {
        res.cookie('studentInfo', result, { 
            httpOnly: true, // Ensures the cookie is only sent over HTTP(S) and not accessible via JavaScript
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict' // Ensures the cookie is sent only for same-site requests
        });
        res.status(200).json({ message : result});
    }
    else {
        res.status(400).json({ message : result });
    }
    } catch (error) {
    console.log(error);  
    res.status(500).json({ message : "Something went wrong" });
    }
}

module.exports = {registerController, loginController};