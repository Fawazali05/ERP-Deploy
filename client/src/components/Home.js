import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading';
import Sidenav from './sidenav';

const Home = () => {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from MongoDB when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve the authentication token from local storage
      const authToken = localStorage.getItem('token');

      // Set the authorization header with the token
      const headers = {
        'auth-token': authToken,
        'Content-Type': 'application/json',
      };

      // Create the request options object
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({}), // Empty JSON object as the request body
      };

      // Make the POST request
      const response = await fetch('http://localhost:5000/api/student/fetchStudentDataCard', requestOptions);
      //console.log(response);
      // Check if the response status is OK (200)
      if (response.ok) {
        // Parse the JSON response
        const responseData = await response.json();
        if (responseData.formData === 0) {
          // Handle the case when the array is empty (e.g., display a message or do nothing)
          console.log('Received an empty array.');
      } else {
          // Set the form data from the response data
         await setFormData(responseData.formData[0]);
         setLoading(false);
      }
      } else {
        // Handle non-successful response (e.g., 4xx or 5xx status)
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleEditClick = () => {
    // Enable editing mode
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send a POST request to update data in MongoDB
      const authToken = localStorage.getItem('token');

      const headers = {
        'auth-token': authToken,
        'Content-Type': 'application/json',
      };

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      };

      const response = await fetch('http://localhost:5000/api/student/saveStudentDataCard', requestOptions);

      if (response.ok) {
        // Request was successful
        // Disable editing mode
        setIsEditing(false);
        alert('Data saved successfully');
      } else {
        // Handle non-successful response (e.g., 4xx or 5xx status)
        console.error('Error updating data:', response.status, response.statusText);
        alert("Details incomplete or User not logged in")
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the form data when input fields change
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Sidenav />
      {loading ? (<Loading/>) : (<>
      <div className="container text-center">
        <br />
        <h3>Student Profile</h3>
        <br />
        {/* Your form input fields here */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="Name" className="form-label">Name (As on Marksheet in Capital Letters)</label>
            <input type="text" value={formData.Name || ''} onChange={handleInputChange} className="form-control" name="Name" id="Name" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Birthday" className="form-label">Date of Birth </label><br />
            <input value={formData.Birthday || ''} onChange={handleInputChange} type="date" name="Birthday" id="Birthday" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Gender" className="form-label">Gender (M/F)</label>
            <input value={formData.Gender || ''} onChange={handleInputChange} type="text" className="form-control" name="Gender" id="Gender" disabled={!isEditing} />
          </div>
        </div>

        {/* Additional form fields */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="Religion" className="form-label">Religion</label>
            <input value={formData.Religion || ''} onChange={handleInputChange} type="text" className="form-control" name="Religion" id="Religion" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Caste" className="form-label">Caste</label><br />
            <input value={formData.Caste || ''} onChange={handleInputChange} type="text" name="Caste" id="Caste" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Bloodgroup" className="form-label">Blood Group</label>
            <input value={formData.Bloodgroup || ''} onChange={handleInputChange} type="text" className="form-control" name="Bloodgroup" id="Bloodgroup" disabled={!isEditing} />
          </div>
        </div>

        {/* Add more input fields for other form elements */}

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="Email" className="form-label">Email</label>
            <input value={formData.Email || ''} onChange={handleInputChange} type="email" className="form-control" name="Email" id="Email" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="AdmissionYear" className="form-label">Year Of Admission in FY</label><br />
            <input value={formData.AdmissionYear || ''} onChange={handleInputChange} type="text" name="AdmissionYear" id="AdmissionYear" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="PRN" className="form-label">PRN</label>
            <input value={formData.PRN || ''} onChange={handleInputChange} type="text" className="form-control" name="PRN" id="PRN" disabled={!isEditing} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="Mentor" className="form-label">Name of Mentor</label>
            <input value={formData.Mentor || ''} onChange={handleInputChange} type="text" className="form-control" name="Mentor" id="Mentor" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Course" className="form-label">Course</label><br />
            <input value={formData.Course || ''} onChange={handleInputChange} type="text" name="Course" id="Course" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="ProjectGuide" className="form-label">Name Of Project Guide</label>
            <input value={formData.ProjectGuide || ''} onChange={handleInputChange} type="text" className="form-control" name="ProjectGuide" id="ProjectGuide" disabled={!isEditing} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="CategoryOfAdmission" className="form-label">Category Of Admission</label>
            <input value={formData.CategoryOfAdmission || ''} onChange={handleInputChange} type="text" className="form-control" name="CategoryOfAdmission" id="CategoryOfAdmission" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Mobile1" className="form-label">Mobile Number 1</label><br />
            <input value={formData.Mobile1 || ''} onChange={handleInputChange} type="text" name="Mobile1" id="Mobile1" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="Mobile2" className="form-label">Mobile Number 2</label>
            <input value={formData.Mobile2 || ''} onChange={handleInputChange} type="text" className="form-control" name="Mobile2" id="Mobile2" disabled={!isEditing} />
          </div>
        </div>
        {/* End of additional input fields */}

        <br />
        {!isEditing ? (
          <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

        ) : (
          <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
        )}

        <Link to="/previous_academic_results"><button type="button" className="btn btn-primary mx-2">Next</button></Link>
      </div></>)}
    </>
  );
};

export default Home;
