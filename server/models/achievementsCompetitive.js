const mongoose = require('mongoose');

const achievements = new mongoose.Schema({
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
    AdmissionYear:{
        type : String
    },
    Branch:{
        type : String
    },
    Type1:{
        type: String
    },
    Level1:{
        type : String
    },
    Description1:{
        type : String
    },
    Type2:{
        type: String
    },
    Level2:{
        type : String
    },
    Description2:{
        type : String
    },
    Type3:{
        type: String
    },
    Level3:{
        type : String
    },
    Description3:{
        type : String
    },
    Type4:{
        type: String
    },
    Level4:{
        type : String
    },
    Description4:{
        type : String
    },
    Type5:{
        type: String
    },
    Level5:{
        type : String
    },
    Description5:{
        type : String
    },
    GATEValidity:{
        type: String
    },
    GATEScore:{
        type: String
    },
    GateDate:{
        type: String
    },
    CATValidity:{
        type: String
    },
    CATScore:{
        type: String
    },
    CATDate:{
        type: String
    },
    GREValidity:{
        type: String
    },
    GREScore:{
        type: String
    },
    GREDate:{
        type: String
    },
    MPSCValidity:{
        type: String
    },
    MPSCScore:{
        type: String
    },
    MPSCDate:{
        type: String
    },
    UPSCValidity:{
        type: String
    },
    UPSCScore:{
        type: String
    },
    UPSCDate:{
        type: String
    },
    OtherExam:{
        type: String
    },
    OtherExamValidity:{
        type: String
    },
    OtherExamScore:{
        type: String
    },
    OtherExamDate:{
        type: String
    }


});

const AchievementCompetitive = mongoose.model("achievementcompetitive",achievements);

module.exports = AchievementCompetitive;