// components/ImageUploader.js
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const Image = () => {
  const [title, setTitle] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    try {
      const authToken = localStorage.getItem('token');

      const requestOptions = {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      };

      const response = await fetch('http://localhost:5000/api/images/display', requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        //console.log(responseData)
        await setImages(await responseData[0].images);
        setLoading(false);
       
        
      } else {
        console.error('Error fetching images:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const deleteImages = async () => {
    try {
      const authToken = localStorage.getItem('token');

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'auth-token': authToken,
        },
      };

      const response = await fetch('http://localhost:5000/api/images/DeleteImages', requestOptions);

      if (response.ok) {
        
        alert("Documents deleted")
        window.location.reload();
      } else {
        alert("No Documents to delete")
        console.error('Error fetching images:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setSelectedImages(selectedFiles);
  };

  const handleUpload = async () => {
    if (!selectedImages || selectedImages.length === 0) {
      alert('Please select at least one image to upload.');
      return;
    }

    const authToken = localStorage.getItem('token');

    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      // Use the same field name as in the backend 'upload.array()'
      formData.append('images', image); // Corrected field name 'images'
    });
    formData.append('title', title);

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'auth-token': authToken,
        },
        body: formData,
      };

      const response = await fetch('http://localhost:5000/api/images/upload', requestOptions);
      if (response.ok) {
        alert('Images uploaded successfully');
        setTitle('');
        setSelectedImages([]);
        window.location.reload();

      } else {
        console.error('Error uploading images:', response.status, response.statusText);
        alert('Error uploading images. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    }
  };

  return (
    <>

      <Sidenav />
      {loading ? (<Loading/>) : (<>
      <div className='container'>
        <p>Upload the images of documents with their respective names in the following order <br /></p>
          <ol>
            <li>Profile photo</li>
            <li>SSC Marksheet</li>
            <li>HSC Marksheet</li>
            <li>Graduation Marksheet</li>
            <li>Offer Letter</li>
            <li>Achievement Certificates</li>
          </ol>
          <p> if document is having multiple pages give the names accordingly as page1,page2 so on</p>
       
        <h2>Image Uploader</h2>
        <input type="text" className="form-control" placeholder="Enter name of the document" value={title} onChange={handleTitleChange} />
        <br />
        <input type="file" className="form-control" name='images' accept="image/*" multiple onChange={handleImageChange} />
        <br />
        <button className='btn btn-primary' onClick={handleUpload}>Upload Image</button>
        <Link to="/Report"><button type="button" className="btn btn-primary mx-2">Download Profile Report</button></Link>
        <Link to="/research"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>
        <button className='btn btn-danger' onClick={deleteImages}>Delete All Documents</button>
      </div>
      <br />
      {loading ? (<p>Loading Images </p>) : (<div className='container'>
        <h2>Image Gallery</h2>
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image._id} className="image-card">
              <h6>{image.title}</h6>
              <img src={image.url} alt={image.title} style={{ width: '500px', height: '500px' }} />

            </div>
          ))}
        </div> 
        
      </div>)}
</>)}
    </>
  );
};

export default Image;
