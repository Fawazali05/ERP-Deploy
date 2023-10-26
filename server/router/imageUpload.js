const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config({ path : './config.env'})

const CLOUDNAME = process.env.CLOUDNAME;
const APIKEY = process.env.APIKEY;
const APISECRET = process.env.APISECRET;

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: APIKEY,
  api_secret: APISECRET,
});
const Images = require('../models/images')
const StudentPer = require('../models/User');


const upload = multer({ dest: 'uploads/' });

// Route to fetch all image details
router.get('/display', fetchuser, async (req, res) => {
  //console.log(req.user.id);
  try {
    const images = await Images.find({ user: req.user.id }); // Fetch all images from the database

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
});

/* router.post('/upload', fetchuser, upload.array('images', 12), async (req, res) => {
  try {
    const userId = req.user.id;
    const uploadedImages = req.files;
    const client = await StudentPer.findOne({_id : userId});
    const customFilename = `image_${client.mcaprn}_${req.body.title}.jpg`;
    const uploadedImagePromises = uploadedImages.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path,{
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: customFilename, // Replace with a unique filename
      });
      return {
        user: userId,
        mcaprn : client.mcaprn,
        title: req.body.title,
        url: result.secure_url,
      };
    });

    const newImages = await Promise.all(uploadedImagePromises);
    const savedImages = await Images.insertMany(newImages);

    res.status(201).json(savedImages);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Error uploading images' });
  }
}); */

router.post('/upload', fetchuser, upload.array('images', 12), async (req, res) => {
  try {
    const { title } = req.body;
    const uploadedImages = req.files;
    const userId = req.user.id;
    const client = await StudentPer.findOne({ _id: userId });
    //console.log(title);
    // Ensure that the user exists and retrieve their user ID (you may need to adapt this to your user authentication logic)
    // For this example, we'll assume you have some authentication middleware that sets req.user


    const customFilename = `image_${client.mcaprn}_${title}.jpg`;

    const uploadedImagePromises = uploadedImages.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: customFilename, // Replace with a unique filename
      });

      return {
        title,
        url: result.secure_url,
      };
    });

    const newImages = await Promise.all(uploadedImagePromises);

    // Check if there is an existing Images document for the user
    let userImages = await Images.findOne({ user: userId });

    if (!userImages) {
      // If no document exists, create a new one
      userImages = new Images({
        user: userId,
        mcaprn: client.mcaprn,
        images: newImages,
      });
    } else {
      // If a document exists, push the new images to it
      userImages.images.push(...newImages);
    }

    const savedImages = await userImages.save();

    res.status(201).json(savedImages);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Error uploading images' });
  }
});


// Delete the documents
router.delete('/DeleteImages', fetchuser, async (req, res) => {
  try {
    // Ensure that the user exists and retrieve their user ID (you may need to adapt this to your user authentication logic)
    // For this example, we'll assume you have some authentication middleware that sets req.user
    const userId = req.user.id;

    // Check if there is an existing Images document for the user
    const userImages = await Images.findOne({ user: userId });

    if (!userImages) {
      return res.status(404).json({ error: 'User images not found' });
    }

    // Delete all images for the user
    await Images.findOneAndRemove({ user: userId });

    res.status(200).json({ status:"ok" });
  } catch (error) {
    console.error('Error deleting images:', error);
    res.status(500).json({ error: 'Error deleting images' });
  }
});


module.exports = router;