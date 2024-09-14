const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    phone : {
        type : String,
        trim : true,
        required : true
    },
    registrationNum : {
        type : String,
        trim : true,
        unique : true, // unique : true means that this field should be unique in the database
        required : true
    },
    gender : {
        type : String,
        trim : true,
        required : true
    },
    course :{
        type : String,
        trim : true,
        required : true
    },
    branch : {
        type : String,
        trim : true,
        required : true
    },
    profilePic : {
        type : String,
        trim : true,
    },
    year : {
        type : Number,
        trim : true,
        enum : [1,2,3,4],
        required : true
    },
    batch : {
        type : String,
        trim : true,
        required : true
    },
    city : {
        type : String,
        trim : true,
        required : true
    },
    state : {
        type : String,
        trim : true,
        required : true
    },
    isMobileVerified : {
        type : Boolean,
        default : false
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    isSelected : {
        type : Boolean,
        default : false
    },
    isBlocked : {
        type : Boolean,
        default : false
    }  
},
{
    timestamps : true
}
);

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;