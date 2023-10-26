const mongoose = require('mongoose');

const images = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    mcaprn:{
        type : String
    },
    images: [{ title: String, url: String }]

});

const Images = mongoose.model("images",images);

module.exports = Images;