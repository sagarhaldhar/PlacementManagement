const { registerStudent } = require("../services/students.services")


const registerController = async (req,res) => {
    const action = await registerStudent(req);
    if (action) {
        res.status(201).json({ message : action });  
    }
    else {
        res.status(400).json({ message : action});
    }
}

module.exports = {registerController};