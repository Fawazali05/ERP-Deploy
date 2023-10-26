const mongoose = require('mongoose');

const yearResult = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Name:String,
    mcaprn:String,
    AdmissionYear:String,
    Branch: String,
    yclass: [String],
    marksObtained : [Number],
    marksTotal: [Number],
    percentage: [Number],
    CGPA : [Number],
    Yearofpassing : [String]
});

const YearResult = mongoose.model("yearresult",yearResult);

module.exports = YearResult;