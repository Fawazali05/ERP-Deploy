const express = require('express');
const StudentPersonal = require('../models/StudentPersonal');
const Login1 = require('../models/User');
const PreviousResult = require('../models/previousAcademicResults');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const FeesAddress = require('../models/feesAddressParents');
const McaResult = require('../models/mcaResult');
const AchievementCompetitive = require('../models/achievementsCompetitive')
const TrainingPlacement = require('../models/trainingPlacement')
const PaperPublished = require('../models/researchPaper');
const Images = require('../models/images');
const YearResult = require('../models/yearResult')


/* router.post("/personalInfo", fetchuser , async (req,res)=>{
    try{
        const info = await StudentPersonal.create({ ...req.body, user: req.user.id });
        const result = await info.save();
        res.json(result);
       } catch (e) {
        console.log(e);
        res.send("Something Went Wrong");
    }
}); */

/* router.post('/saveStudentDataCard',fetchuser , async (req, res) => {
    try {
      const { name, ...rest } = req.body;
        const user= req.user.id;

        
      const existingStudent = await StudentPersonal.findOne({ user });
  
      if (existingStudent) {
        // If the student exists, update the data
        Object.assign(existingStudent, req.body);
        await existingStudent.save();
        res.status(200).json({ message: 'Student data updated successfully' });
      } else {
        // If the student doesn't exist, create a new student
        const info = await StudentPersonal.create({ ...req.body, user: req.user.id });
        const result = await info.save();
        res.status(201).json({ message: 'Student data created successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }); */

router.post('/saveStudentDataCard', fetchuser, async (req, res) => {
  try {
    const { name, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await StudentPersonal.findOne({ user });
    

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await StudentPersonal.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/fetchStudentDataCard', fetchuser, async (req, res) => {
  try {
    const data = await StudentPersonal.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

//Routes for previous year academic results

router.post('/savePreviousResults', fetchuser, async (req, res) => {
  try {
    const { SSCYear, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await PreviousResult.findOne({ user });

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      //console.log(StudentPer);
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Name = StudentPer.Name;
        existingStudent.AdmissionYear = StudentPer.AdmissionYear;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await PreviousResult.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Name = StudentPer.Name;
        info.AdmissionYear = StudentPer.AdmissionYear;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchPreviousResults', fetchuser, async (req, res) => {
  try {
    const data = await PreviousResult.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

// Routes for Fees , Address and Parents Information

router.post('/saveFeeAddParents', fetchuser, async (req, res) => {
  try {
    const { MentorName, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await FeesAddress.findOne({ user });

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      //console.log(StudentPer);
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Name = StudentPer.Name;
        existingStudent.AdmissionYear = StudentPer.AdmissionYear;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await FeesAddress.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Name = StudentPer.Name;
        info.AdmissionYear = StudentPer.AdmissionYear;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchFeeAddParents', fetchuser, async (req, res) => {
  try {
    const data = await FeesAddress.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});


// Routes for MCA Result Information

router.post('/saveMcaResults', fetchuser, async (req, res) => {
  try {
    const { semesterNumber, subjects, marks, attempt, passing, outof, ...rest } = req.body;
    const user = req.user.id;
    const Login = await Login1.findOne({ _id: user });
    const StudentPer = await StudentPersonal.findOne({ user: user })
    // Fetch the existing McaResult document for the user
    const existingInfo = await McaResult.findOne({ user: user });

    if (existingInfo) {
      // If the document exists, append the new data to the arrays
      existingInfo.semesterNumber.push(...semesterNumber);
      existingInfo.subjects.push(...subjects);
      existingInfo.marks.push(...marks);
      existingInfo.passing.push(...passing);
      existingInfo.outof.push(...outof);
      existingInfo.attempt.push(...attempt);
      if (Login) {
        existingInfo.mcaprn = Login.mcaprn;
        existingInfo.Name = StudentPer.Name;
        existingInfo.AdmissionYear = StudentPer.AdmissionYear;
        existingInfo.Branch = Login.Branch;
      }

      // Append other data to corresponding arrays in the document

      // Save the updated document
      const result = await existingInfo.save();
    } else {
      // If the document doesn't exist, create a new one and append the data

      // Fetch additional data from Login1 and StudentPersonal collections
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });

      // Create a new McaResult document with the fetched data
      const newInfo = new McaResult({
        user: user,
        semesterNumber: semesterNumber,
        subjects: subjects,
        marks: marks,
        attempt: attempt,
        passing: passing,
        outof: outof,
        // Initialize other arrays with data from req.body
        mcaprn:  Login.mcaprn ? Login.mcaprn : null,
        Name: StudentPer ? StudentPer.Name : null,
        AdmissionYear: StudentPer ? StudentPer.AdmissionYear : null,
        Branch: Login.Branch ? Login.Branch : null
      });

      // Save the new document
      const result = await newInfo.save();
    }

    res.status(201).json({ message: 'Student data updated/created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/deleteMcaResults', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find and delete the McaResult document for the user
    const deletedInfo = await McaResult.findOneAndRemove({ user: userId });

    if (!deletedInfo) {
      return res.status(404).json({ error: 'McaResult data not found' });
    }

    res.status(200).json({ status:"ok" });
  } catch (error) {
    console.error('Error deleting McaResult data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.post('/fetchMcaResults', fetchuser, async (req, res) => {
  try {
    const data = await McaResult.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "Error", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

// Routes For saving resulr of year

router.post('/saveYear', fetchuser, async (req, res) => {
  try {
    const { yclass , marksObtained, marksTotal, percentage, CGPA, Yearofpassing , ...rest } = req.body;
    const user = req.user.id;
    const Login = await Login1.findOne({ _id: user });
    const StudentPer = await StudentPersonal.findOne({ user: user })
    // Fetch the existing YearResult document for the user
    const existingInfo = await YearResult.findOne({ user: user });

    if (existingInfo) {
      // If the document exists, append the new data to the arrays
      existingInfo.yclass.push(...yclass);
      existingInfo.marksObtained.push(...marksObtained);
      existingInfo.marksTotal.push(...marksTotal);
      existingInfo.percentage.push(...percentage);
      existingInfo.CGPA.push(...CGPA);
      existingInfo.Yearofpassing.push(...Yearofpassing);
      if (Login) {
        existingInfo.mcaprn = Login.mcaprn;
        existingInfo.Name = StudentPer.Name;
        existingInfo.AdmissionYear = StudentPer.AdmissionYear;
        existingInfo.Branch = Login.Branch;
      }
      // Append other data to corresponding arrays in the document

      // Save the updated document
      const result = await existingInfo.save();
    } else {
      // If the document doesn't exist, create a new one and append the data

      // Fetch additional data from Login1 and StudentPersonal collections
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });

      // Create a new YearResult document with the fetched data
      const newInfo = new YearResult({
        user: user,
        yclass: yclass,
        marksObtained: marksObtained,
        marksTotal: marksTotal,
        percentage: percentage,
        CGPA: CGPA,
        Yearofpassing: Yearofpassing,
        // Initialize other arrays with data from req.body
        mcaprn: Login ? Login.mcaprn : null,
        Name: StudentPer ? StudentPer.Name : null,
        AdmissionYear: StudentPer ? StudentPer.AdmissionYear : null,
        Branch: Login.Branch ? Login.Branch : null
      });

      // Save the new document
      const result = await newInfo.save();
    }

    res.status(201).json({ message: 'Student data updated/created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/deleteYear', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find and delete the YearResult document for the user
    const deletedInfo = await YearResult.findOneAndRemove({ user: userId });

    if (!deletedInfo) {
      return res.status(404).json({ error: 'YearResult data not found' });
    }

    res.status(200).json({ status:"ok" });
  } catch (error) {
    console.error('Error deleting YearResult data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchYear', fetchuser, async (req, res) => {
  try {
    const data = await YearResult.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

// Routes for Achievements and Competitive exams

router.post('/saveAchievements', fetchuser, async (req, res) => {
  try {
    const { Technical, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await AchievementCompetitive.findOne({ user });

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      //console.log(StudentPer);
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Name = StudentPer.Name;
        existingStudent.AdmissionYear = StudentPer.AdmissionYear;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await AchievementCompetitive.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Name = StudentPer.Name;
        info.AdmissionYear = StudentPer.AdmissionYear;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchAchievements', fetchuser, async (req, res) => {
  try {
    const data = await AchievementCompetitive.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});



// Routes for Training And Placement Data
router.post('/saveTrainingPlacement', fetchuser, async (req, res) => {
  try {
    const { CourseName1, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await TrainingPlacement.findOne({ user });

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      //console.log(StudentPer);
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Name = StudentPer.Name;
        existingStudent.AdmissionYear = StudentPer.AdmissionYear;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await TrainingPlacement.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Name = StudentPer.Name;
        info.AdmissionYear = StudentPer.AdmissionYear;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchTrainingPlacement', fetchuser, async (req, res) => {
  try {
    const data = await TrainingPlacement.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});



// Routes for Research Paper Publication
router.post('/saveResearch', fetchuser, async (req, res) => {
  try {
    const { NameOfStaff, ...rest } = req.body;
    const user = req.user.id;

    const existingStudent = await PaperPublished.findOne({ user });

    if (existingStudent) {
      // If the student exists, update the data
      Object.assign(existingStudent, req.body);

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      //console.log(StudentPer);
      //console.log(Login.mcaprn);
      if (Login) {
        existingStudent.mcaprn = Login.mcaprn;
        existingStudent.Name = StudentPer.Name;
        existingStudent.AdmissionYear = StudentPer.AdmissionYear;
        existingStudent.Branch = Login.Branch;
      }

      await existingStudent.save();
      res.status(200).json({ message: 'Student data updated successfully' });
    } else {
      // If the student doesn't exist, create a new student
      const info = await PaperPublished.create({ ...req.body, user: req.user.id });

      // Fetch the mcaprn value from the OtherCollection
      const Login = await Login1.findOne({ _id: user });
      const StudentPer = await StudentPersonal.findOne({ user: user });
      if (Login) {
        info.mcaprn = Login.mcaprn;
        info.Name = StudentPer.Name;
        info.AdmissionYear = StudentPer.AdmissionYear;
        info.Branch = Login.Branch;
      }

      const result = await info.save();
      res.status(201).json({ message: 'Student data created successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/fetchResearch', fetchuser, async (req, res) => {
  try {
    const data = await PaperPublished.find({ user: req.user.id });
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});

//Route for all the details
router.post('/fetchReport', fetchuser, async (req, res) => {
  try {
    const data1 = await StudentPersonal.find({ user: req.user.id });
    const data2 = await PreviousResult.find({ user: req.user.id });
    const data3 = await FeesAddress.find({ user: req.user.id });
    const data4 = await McaResult.find({ user: req.user.id });
    const data5 = await YearResult.find({ user: req.user.id });
    const data6 = await AchievementCompetitive.find({ user: req.user.id });
    const data7 = await TrainingPlacement.find({ user: req.user.id });
    const data8 = await PaperPublished.find({ user: req.user.id });
    const ImageData = await Images.find({ user: req.user.id });
    let data = [];
    data = data1.concat(data2, data3, data4, data5, data6, data7, data8);

    //console.log(data);
    if (data.length === 0) {
      res.json({ status: "OK", formData: 0 })
    } else {
      res.json({ status: "OK", formData: data , ImageData : ImageData[0].images})
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error occured");
  }
});


module.exports = router;