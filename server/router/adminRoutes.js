const express = require('express');
const StudentPersonal = require('../models/StudentPersonal');
const PreviousResult = require('../models/previousAcademicResults');
const router = express.Router();
const FeesAddress = require('../models/feesAddressParents');
const McaResult = require('../models/mcaResult');
const AchievementCompetitive = require('../models/achievementsCompetitive')
const TrainingPlacement = require('../models/trainingPlacement')
const PaperPublished = require('../models/researchPaper')
const YearResult = require('../models/yearResult')
const Images = require('../models/images')
const fetchadmin = require('../middleware/fetchadmin');

// added
const Admin = require('../models/AdminUser');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs')
const sendEmail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/errorResponse");
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Routes for Previous Academic Results 
router.get('/fetchpreviousResults/:mcaprn', async (req, res) => {
  try {
    const mcaprn = req.params.mcaprn;

    // Fetch student data based on mcaprn
    const studentData = await PreviousResult.findOne({ mcaprn }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json(studentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});

// Route for Student Data Card
router.post('/fetchStudentDataCard/:year/:Branch',fetchadmin, async (req, res) => {
  try {
    const {year, Branch} = req.params;
console.log(year);
    // Fetch student data based on year
    const studentData = await StudentPersonal.find({ AdmissionYear : year, Branch: Branch }).lean().exec();

    if (studentData.length === 0) { // Check if the array is empty
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json({formData: studentData});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});


// Route for Fee Parent Address
router.get('/fetchFeeParent/:mcaprn', async (req, res) => {
  try {
    const mcaprn = req.params.mcaprn;

    // Fetch student data based on mcaprn
    const studentData = await FeesAddress.findOne({ mcaprn }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json(studentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});

// Route for Current Mca Result
router.get('/fetchCurrentMcaResult/:mcaprn', async (req, res) => {
  try {
    const mcaprn = req.params.mcaprn;

    // Fetch student data based on mcaprn
    const studentData = await McaResult.findOne({ mcaprn }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json(studentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});

//Route Academic Results

router.get('/fetchAcademicResult/:Branch/:AdmissionYear', async (req, res) => {
  try {
    const { Branch, AdmissionYear } = req.params;

    // Fetch student data based on branch and admission year
    const studentData1 = await McaResult.find({ Branch, AdmissionYear }).lean().exec();
    const studentData = await YearResult.find({ Branch, AdmissionYear }).lean().exec();

    

    if (!studentData && !studentData1) {
      return res.status(404).json({ formData: 0 });
    } else {
      res.status(200).json({ formData: studentData, formData1: studentData1 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});


// Route for Achievements
router.post('/fetchAchievements/:year1/:dept/:cat/:level',fetchadmin, async (req, res) => {
  try {
    const {year1, dept, cat, level} = req.params;
console.log(year1);
    // Fetch student data based on mcaprn
    const studentData = await AchievementCompetitive.find({AdmissionYear: year1, Branch: dept , $or: [
      {
        $or: [
          { Type1: cat },
          { Type2: cat },
          { Type3: cat },
          { Type4: cat },
          { Type5: cat }
        ]
      },
      {
        $or: [
          { Level1: level },
          { Level2: level },
          { Level3: level },
          { Level4: level },
          { Level5: level }
        ]
      }
    ]
    }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json({formData : studentData});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});


// Route for Competitive
router.post('/fetchCompetitive/:year1/:dept/:exam', fetchadmin, async (req, res) => {
  try {
    const { year1, dept, exam } = req.params;
    let studentData; // Declare the variable here

    if (exam === "GATE") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, GATEValidity: "Valid" }).lean().exec();
    } else if (exam === "CAT") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, CATValidity: "Valid" }).lean().exec();
    } else if (exam === "GRE") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, GREValidity: "Valid" }).lean().exec();
    } else if (exam === "MPSC") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, MPSCValidity: "Valid" }).lean().exec();
    } else if (exam === "UPSC") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, UPSCValidity: "Valid" }).lean().exec();
    } else if (exam === "OtherExam") {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept, OtherExamValidity: "Valid" }).lean().exec();
    } else {
      studentData = await AchievementCompetitive.find({ AdmissionYear: year1, Branch: dept }).lean().exec();
    }

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json({ formData: studentData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});




// Route for Training And Placement
router.post('/fetchPlacements/:year1/:dept/:cat', fetchadmin, async (req, res) => {
  try {
    const { year1, dept, exam } = req.params;

    
    const studentData = await TrainingPlacement.find({ AdmissionYear: year1, Branch: dept }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json({ formData: studentData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});


// Route for Research Paper Published
router.post('/fetchResearchPaper/:year1/:dept', fetchadmin, async (req, res) => {
  try {
    const { year1, dept } = req.params;

    
    const studentData = await PaperPublished.find({ AdmissionYear: year1, Branch: dept }).lean().exec();

    if (!studentData) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    res.status(200).json({ formData: studentData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student data' });
  }
});

//Student report

router.post('/fetchStudentReport/:mcaprn',fetchadmin, async (req, res) => {
  try {
    const mcaprn = req.params.mcaprn;

    // Fetch student data based on mcaprn
    const data1 = await StudentPersonal.find({ mcaprn: mcaprn});
    const data2 = await PreviousResult.find({ mcaprn: mcaprn});
    const data3 = await FeesAddress.find({ mcaprn: mcaprn});
    const data4 = await McaResult.find({ mcaprn: mcaprn});
    const data5 = await YearResult.find({ mcaprn: mcaprn});
    const data6 = await AchievementCompetitive.find({ mcaprn: mcaprn});
    const data7 = await TrainingPlacement.find({ mcaprn: mcaprn});
    const data8 = await PaperPublished.find({ mcaprn: mcaprn});
    const ImageData = await Images.find({ mcaprn: mcaprn });
    //let data = [data1, data2, data3, data4, data5, data6, data7, data8, data9 ];
    let data = data1.concat(data2, data3, data4, data5, data6, data7, data8);
    
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 });
    } else {
      res.json({ status: "OK", formData: data, ImageData : ImageData[0].images });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});


// added


router.post('/createAdmin', [
  body('firstname', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Enter strong password at 6 char').isLength({ min: 6 ,max:14})
], async (req, res) => {
  let success = false;
  //If there r errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
  }
  //check whether user with same email exists

  try {
      let user = await Admin.findOne({ email: req.body.email });
      if (user) {
          return res.status(400).json({success,
              error: "Sorry a user with this email already exists"
          })
      }
      //securing password for login
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await Admin.create({
          firstname: req.body.firstname,
          email: req.body.email,
          password: secPass, 
          Branch : req.body.Branch
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
      res.status(500).send("Internal server error occured");
  }
})



router.post('/getuser', fetchadmin, async (req, res) => {
  try {
      let userId = req.user.id;
      const user = await Admin.findById(userId).select("-password");
      res.send(user);
  } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
  }
})



router.post('/adminlogin', [
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  //If there r errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
  }
  console.log("Admin check")
  const { email, password } = req.body;
  try {
      console.log("in try of admin")
      let user = await Admin.findOne({ email });
      console.log("User = ",user)
      if (!user) {
          return res.status(400).json({ success, error: "Please try to login with correct credentials" })
      }
      console.log(user.password)
      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log(passwordCompare)
      if (!passwordCompare) {
          console.log("In password compare")
          return res.status(400).json({ success,error: "Please try to login with correct credentials" })
      }
      const data = {
          user: {
              id: user.id
          }
      }
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });

  } catch (error) {
      console.log(error.message);
      // res.status(500).send("internal server error occured");
      res.status(500).send(error);

  }
})


router.post('/forgotpassword',async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  console.log("In auth.js");

  const { email } = req.body;
  
  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      // return next(new ErrorResponse("Email could not be sent", 404));
      res.status(404).json({ success: false, data: "Email could not be sent. The email does not belong to nay user." });
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/Admin/passwordreset/${resetToken}`;

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



router.put('/passwordreset/:resetToken',async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log("in Admin  user");
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
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
})


router.post('/checkEmail', async (req, res) => {
  const { email } = req.body;

  try {
    // Search for a user with the provided email in your database
    const user = await Admin.findOne({ email });

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

module.exports = router;