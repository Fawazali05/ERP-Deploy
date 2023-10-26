const mongoose = require('mongoose');

const PreviousResultSchema = new mongoose.Schema({
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
        type: String
    },
    AdmissionYear:{
        type : String
    },
    SSCYear:{
        type: String,
        required : true
    },
    SSCSchool:{
        type: String,
        required : true
    },
    SSCBoard:{
        type: String,
        required : true
    },
    SSCMarks:{
        type: String,
        required : true
    },
    SSCTotal:{
        type: String,
        required : true
    },
    SSCPercent:{
        type: String,
        required : true
    },
    HSCYear:{
        type: String,
        required : true
    },
    HSCSchool:{
        type: String,
        required : true
    },
    HSCBoard:{
        type: String,
        required : true
    },
    HSCMarks:{
        type: String,
        required : true
    },
    HSCTotal:{
        type: String,
        required : true
    },
    HSCPercent:{
        type: String,
        required : true
    },
    Medium:{
        type: String,
        required : true
    },
    MathSsc:{
        type: String,
        required : true
    },
    MathsHsc:{
        type: String,
        required : true
    },
    YearOfPassingUg:{
        type: String,
        required : true
    },
    NameOfUgCollege:{
        type: String,
        required : true
    },
    University:{
        type: String,
        required : true
    },
    GraduationMarks:{
        type: String,
        required : true
    },
    GraduationTotal:{
        type: String,
        required : true
    },
    GraduationPercent:{
        type: String,
        required : true
    }
});

const PreviousResult = mongoose.model("previousresult",PreviousResultSchema);

module.exports = PreviousResult;