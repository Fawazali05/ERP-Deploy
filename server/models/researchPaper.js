const mongoose = require('mongoose');

const researchPaper = new mongoose.Schema({
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
        type: String
    },
    NameOfStaff:{
        type : String
    },
    TitleOfPaper:{
        type : String
    },
    NameOfJournal:{
        type : String
    },
    ISSN:{
        type : String
    },
    DOI:{
        type : String
    },
    TypeOfListing:{
        type : String
    },
    DateOfPublication:{
        type : String
    },
    ImpactFactor:{
        type : String
    },
    PaperLink:{
        type : String
    }

});

const PaperPublished = mongoose.model("paperpublished",researchPaper);

module.exports = PaperPublished;