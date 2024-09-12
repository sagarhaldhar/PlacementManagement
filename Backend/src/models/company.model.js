const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address : {
        type : String,
        trim : true,
        required : true,
    },
    companyImages : [
        {
        type : String,
    }
    ],
    dateOfDrive : {
        type : Date,
        default : "coming soon"
    }
})

module.exports = mongoose.model('Company', companySchema, Company); // Company is the name of the collection