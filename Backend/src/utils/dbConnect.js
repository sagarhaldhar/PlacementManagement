const mongoose = require("mongoose");
const DBconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test");
        console.log("database connected successfully");
    } catch (error) {
        console.log(error);     
    }
}

module.exports = DBconnect;