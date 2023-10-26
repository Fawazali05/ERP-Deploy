const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
// const JWT_SECRET = "ThisPassword";

// added

const crypto = require('crypto');
const sendEmail  = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');

//ROUTE 1 : Create a user using : POST "localhost:5000/api/auth"  Doesn't require auth
router.post('/createUser', [
    body('firstname', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter strong password at 5 char').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //If there r errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether user with same email exists

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success,
                error: "Sorry a user with this email already exists"
            })
        }
        //securing password for login
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            firstname: req.body.firstname,
            email: req.body.email,
            password: secPass, 
            Branch : req.body.Branch,
            typeUser: req.body.typeUser ,
            AdmissionYear:req.body.AdmissionYear || '',
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        // res.send(user);
        success = true;
        res.json({success,user, authToken });
    } catch (error) {
        console.log(error.message);
        // res.status(500).send("internal server error occured");
    }
})


// ROUTE 2 :Authenticate a user using : POST "/api/auth/login" . No login required

router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    //If there r errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success,error: "Please try to login with correct credentials" })
        }
        //console.log(user);
        const data = {
            user: {
                id: user.id
            }
        }
        let typeUser = user.typeUser;
      
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authToken, typeUser });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occured");
    }
})


// ROUTE 3 :Get Loggedin  user details using : POST "/api/auth/getuser" . login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occured");
    }
})

// added

router.post('/forgotpassword',async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    console.log("In auth.js");

    const { email } = req.body;
    
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(404).json({ success: false, data: "Email could not be sent. The email does not belong to any user." });
        // return next(new ErrorResponse("Email could not be sent", 404));
      }
  
      // Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();
  
      await user.save();
  
      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
  
      // HTML Message
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      console.log("ready");
      
      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
  
        res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        console.log(err);
  
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (err) {
      next(err);
    }
  }  );


  router.post('/checkEmail', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Search for a user with the provided email in your database
      const user = await User.findOne({ email });
  
      if (user) {
        // Email exists in the database
        return res.json({ emailExists: true });
      } else {
        // Email doesn't exist in the database
        return res.json({ emailExists: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while checking the email.' });
    }
  });

  router.put('/passwordreset/:resetToken',async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
    
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        console.log("in !user");
        return next(new ErrorResponse("Invalid Token", 400));
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user.password = secPass;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Successfully",
        token: user.getSignedJwtToken(),
      });
    } catch (err) {
      next(err);
    }
  })
module.exports = router;