const mongoose = require('mongoose');

const placement = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Name:{
        type:String
    },
    mcaprn:{
        type: String
    },
    Branch:{
        type:String
    },
    AdmissionYear:{
        type : String
    },
    CourseName1:{
        type: String
    },
    CourseDetails1:{
        type: String
    },
    CourseDate1:{
        type: String
    },
    CourseName2:{
        type: String
    },
    CourseDetails2:{
        type: String
    },
    CourseDate2:{
        type: String
    },
    CourseName3:{
        type: String
    },
    CourseDetails3:{
        type: String
    },
    CourseDate3:{
        type: String
    },
    CName1 :{
        type : String
    },
    CAddress1 :{
        type : String
    },
    P1 :{
        type : String
    },
    Stipend1 :{
        type : String
    },
    Duration1 :{
        type : String
    },
    CName2 :{
        type : String
    },
    CAddress2 :{
        type : String
    },
    P2 :{
        type : String
    },
    Stipend2 :{
        type : String
    },
    Duration2 :{
        type : String
    },
    CompanyName1:{
        type: String
    },
    CompanyAddress1:{
        type: String
    },
    Post1:{
        type: String
    },
    CompanyCTC1:{
        type: String
    },
    DateOfJoining1:{
        type: String
    },
    CompanyName2:{
        type: String
    },
    CompanyAddress2:{
        type: String
    },
    Post2:{
        type: String
    },
    CompanyCTC2:{
        type: String
    },
    DateOfJoining2:{
        type: String
    }
    
});

const TrainingPlacement = mongoose.model("trainingplacement",placement);

module.exports = TrainingPlacement;