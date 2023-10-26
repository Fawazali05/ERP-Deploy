import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading';

import Sidenav from './sidenav';

const Research = () => {
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
      const response = await fetch('http://localhost:5000/api/student/fetchResearch', requestOptions);
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
          setFormData(responseData.formData[0]);
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

      const response = await fetch('http://localhost:5000/api/student/saveResearch', requestOptions);

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
      <br />
        {loading ? (<Loading/>): (<>   
      <br />
      <div className="container text-center">
      
        <br />
        <h3>Research Paper</h3>
        <br />
        {/* Your form input fields here */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="NameOfStaff" className="form-label">Name of Guide</label>
            <input type="text" value={formData.NameOfStaff || ''} onChange={handleInputChange} className="form-control" name="NameOfStaff" id="NameOfStaff" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="TitleOfPaper" className="form-label">Title of Paper </label><br />
            <input value={formData.TitleOfPaper || ''} onChange={handleInputChange} type="text" name="TitleOfPaper" id="TitleOfPaper" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="NameOfJournal" className="form-label">Name of Journal/ Conference </label>
            <input value={formData.NameOfJournal || ''} onChange={handleInputChange} type="text" className="form-control" name="NameOfJournal" id="NameOfJournal" disabled={!isEditing} />
          </div>
        </div>

        {/* Additional form fields */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="ISSN" className="form-label">ISSN/ISBN, Vol, issue, page no.</label>
            <input value={formData.ISSN || ''} onChange={handleInputChange} type="text" className="form-control" name="ISSN" id="ISSN" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="DOI" className="form-label">DOI</label><br />
            <input value={formData.DOI || ''} onChange={handleInputChange} type="text" name="DOI" id="DOI" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="TypeOfListing" className="form-label">Listed in Database/Peer Reviewed/UGC/SCOPUS</label>
            <input value={formData.TypeOfListing || ''} onChange={handleInputChange} type="text" className="form-control" name="TypeOfListing" id="TypeOfListing" disabled={!isEditing} />
          </div>
        </div>

        {/* Add more input fields for other form elements */}

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="DateOfPublication" className="form-label">Date of Publication</label>
            <input value={formData.DateOfPublication || ''} onChange={handleInputChange} type="date" className="form-control" name="DateOfPublication" id="DateOfPublication" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="ImpactFactor" className="form-label">Impact Factor</label><br />
            <input value={formData.ImpactFactor || ''} onChange={handleInputChange} type="text" name="ImpactFactor" id="ImpactFactor" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="PaperLink" className="form-label">PaperLink</label>
            <textarea value={formData.PaperLink || ''} onChange={handleInputChange} type="text" className="form-control" name="PaperLink" id="PaperLink" disabled={!isEditing} />
          </div>
        </div>

        {/* End of additional input fields */}

        <br />
        <Link to="/training"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>
        {!isEditing ? (
          <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

        ) : (
          <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
        )}

        <Link to="/images"><button type="button" className="btn btn-primary mx-2">Next</button></Link>


      </div>
</>)}
    </>
  )
}

export default Research
