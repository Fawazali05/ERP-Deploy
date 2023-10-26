// server/routes/download.js
const fetchadmin = require('../middleware/fetchadmin');
const express = require('express');
const PreviousResult = require('../models/previousAcademicResults');
const StudentPersonal = require('../models/StudentPersonal');
const FeesAddress = require('../models/feesAddressParents');
const McaResult = require('../models/mcaResult');
const AchievementCompetitive = require('../models/achievementsCompetitive')
const TrainingPlacement = require('../models/trainingPlacement')
const PaperPublished = require('../models/researchPaper')
const router = express.Router();
const json2csv = require('json2csv').parse;

// Assuming you already have an established MongoDB connection and 'db' object
//const connectToMongo = require('../connection'); // Replace with your actual database connection

// Route to download the collection as a CSV file
router.post('/download/previousAcademicResults', fetchadmin , async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await PreviousResult.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

//Route for student personal data
router.post('/download/studentDataCard', fetchadmin, async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await StudentPersonal.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


//Route for fee parents address data
router.post('/download/feeParent',fetchadmin, async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await FeesAddress.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


//Route for Current Mca Results
router.get('/download/mcaResult', async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await McaResult.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

//Route for Achievements Competitive Exams
router.get('/download/Achievements', async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await AchievementCompetitive.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

//Route for Training And Placement
router.get('/download/Placements', async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await TrainingPlacement.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

//Route for Research Paper 
router.post('/download/ResearchPaper',fetchadmin, async (req, res) => {
  try {
    const year = req.query.AdmissionYear;
    console.log(year);

    // Replace 'yourcollection' with your actual collection name
    // const collection = connectToMongo.collection('previousresults');

    // Fetch data from the collection
    const data = await PaperPublished.find({ AdmissionYear: year }).sort({ Name: 1 }).lean().exec();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found in the collection' });
    }

    // Remove "name" from the fields array if it exists
    const fields = ['Name', 'mcaprn', 'AdmissionYear', ...Object.keys(data[0])];
    const nameIndex = fields.lastIndexOf('Name');
    if (nameIndex !== -1) {
      fields.splice(nameIndex, 1);
    }
    const nameIndex1 = fields.lastIndexOf('mcaprn');
    if (nameIndex1 !== -1) {
      fields.splice(nameIndex1, 1);
    }
    const nameIndex2 = fields.lastIndexOf('AdmissionYear');
    if (nameIndex2 !== -1) {
      fields.splice(nameIndex2, 1);
    }

    // Convert JSON data to CSV format
    const csvData = json2csv(data, { fields });

    // Send the CSV data as a downloadable file
    res.setHeader('Content-disposition', 'attachment; filename=collection.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});



module.exports = router;
