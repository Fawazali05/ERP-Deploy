const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    mcaprn:{
        type : String,
    },
    Branch:{
        type: String
    },
    Name:{
        type: String,
        required: true
    },
    Birthday:{
        type: String,
        required: true
    },
    Gender:{
        type: String,
        required: true
    },
    Religion:{
        type: String,
        required: true
    },
    Caste:{
        type: String,
        required: true
    },
    Bloodgroup:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    AdmissionYear:{
        type: String,
        required: true
    },
    PRN:{
        type: String,
        required: true
    },
    Mentor:{
        type: String,
        required: true
    },
    Course:{
        type: String,
        required: true
    },
    ProjectGuide:{
        type: String,
        required: true
    },
    CategoryOfAdmission:{
        type: String,
        required: true
    },
    Mobile1:{
        type: String,
        required: true
    },
    Mobile2:{
        type: String,
        required: true
    }
});

const StudentPersonal = mongoose.model("studentpersonal",UserSchema);

module.exports = StudentPersonal;