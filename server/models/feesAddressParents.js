const mongoose = require('mongoose');

const feeAddress = new mongoose.Schema({
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
    MentorName:{
        type : String,
        required : true
    },
    FyFees:{
        type : String,
        required : true
    },
    DateFyFees:{
        type : String,
        required : true
    },
    SyFees:{
        type : String,
        required : true
    },
    DateSyFees:{
        type : String,
        required : true
    },
    TemporaryAddress:{
        type : String,
        required : true
    },
    PermanentAddress:{
        type : String,
        required : true
    },
    FatherName:{
        type : String,
        required : true
    },
    FatherProfession:{
        type : String,
        required : true
    },
    FatherWorkAddress:{
        type : String,
        required : true
    },
    FatherContact:{
        type : String,
        required : true
    },
    FatherEmail:{
        type : String,
        required : true
    },
    MotherName:{
        type : String,
        required : true
    },
    MotherProfession:{
        type : String,
        required : true
    },
    MotherWorkAddress:{
        type : String,
        
    },
    MotherContact:{
        type : String,
        required : true
    },
    MotherEmail:{
        type : String,
    }

});

const FeesAddress = mongoose.model("feeaddress",feeAddress);

module.exports = FeesAddress;