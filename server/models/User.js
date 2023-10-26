const mongoose = require('mongoose');
const { Schema } = mongoose;

const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    firstname :{
        type : String,
        required: true
    },
    AdmissionYear:{
        type: String,
        required: true
    },
   Branch:{
        type: String,
        required: true
        
    },
    email:{
        type: String,
        required: true
        
    },
    password:{
        type: String,
        required: true
    },
    
    mcaprn:{
        type: String,
        default: function () {
            //return this.name + "MCA"+Math.floor(Math.random() * 100);
            return "REG"+this.AdmissionYear+"-"+this.firstname+new Date().getSeconds();
          },
    },
    typeUser:{
        type: String,
        default: function () {
            //return this.name + "MCA"+Math.floor(Math.random() * 100);
            return "User";
          }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return resetToken;
};


const User = mongoose.model('user', UserSchema);

module.exports = User