const mongoose = require('mongoose');

const mcaResult = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    Name:String,
    mcaprn:String,
    AdmissionYear:String,
    Branch: String,
    semesterNumber: [Number],
    attempt : [Number],
    subjects: [String],
    marks: [Number],
    outof : [Number],
    passing : [String]
});

const McaResult = mongoose.model("mcaresult",mcaResult);

module.exports = McaResult;