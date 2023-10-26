import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const PreviousAcademicResults = () => {
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
      const response = await fetch('http://localhost:5000/api/student/fetchPreviousResults', requestOptions);
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

      const response = await fetch('http://localhost:5000/api/student/savePreviousResults', requestOptions);

      if (response.ok) {
        // Request was successful
        // Disable editing mode
        setIsEditing(false);
        alert('Data saved successfully');
      } else {
        // Handle non-successful response (e.g., 4xx or 5xx status)
        console.error('Error updating data:', response.status, response.statusText);
        alert("Details incomplete or User not logged in");
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
        <h3>Result 10th And 12th</h3>
        <br />
        <div className="row mb-6">
          <div className="col">
            <label htmlFor="SSCYear" className="form-label">Year of Passing 10th</label>
            <input type="text" value={formData.SSCYear || ''} onChange={handleInputChange} className="form-control" name="SSCYear" id="SSCYear" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="SSCSchool" className="form-label">Name of School </label><br />
            <input type="text" value={formData.SSCSchool || ''} onChange={handleInputChange} name="SSCSchool" id="SSCSchool" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="SSCBoard" className="form-label">Name of Board</label>
            <input type="text" value={formData.SSCBoard || ''} onChange={handleInputChange} className="form-control" name="SSCBoard" id="SSCBoard" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="SSCMarks" className="form-label">Marks Obtained</label>
            <input type="text" value={formData.SSCMarks || ''} onChange={handleInputChange} className="form-control" name="SSCMarks" id="SSCMarks" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="SSCTotal" className="form-label">Out Of </label><br />
            <input type="text" value={formData.SSCTotal || ''} onChange={handleInputChange} name="SSCTotal" id="SSCTotal" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="SSCPercent" className="form-label">Percentage</label>
            <input type="text" value={formData.SSCPercent || ''} onChange={handleInputChange} className="form-control" name="SSCPercent" id="SSCPercent" disabled={!isEditing} />
          </div>
        </div>
        <br />
        <div className="row mb-6">
          <div className="col">
            <label htmlFor="HSCYear" className="form-label">Year of Passing 12th</label>
            <input type="text" value={formData.HSCYear || ''} onChange={handleInputChange} className="form-control" name="HSCYear" id="HSCYear" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="HSCSchool" className="form-label">Name of School </label><br />
            <input type="text" value={formData.HSCSchool || ''} onChange={handleInputChange} name="HSCSchool" id="HSCSchool" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="HSCBoard" className="form-label">Name of Board</label>
            <input type="text" value={formData.HSCBoard || ''} onChange={handleInputChange} className="form-control" name="HSCBoard" id="HSCBoard" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="HSCMarks" className="form-label">Marks Obtained</label>
            <input type="text" value={formData.HSCMarks || ''} onChange={handleInputChange} className="form-control" name="HSCMarks" id="HSCMarks" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="HSCTotal" className="form-label">Out Of </label><br />
            <input type="text" value={formData.HSCTotal || ''} onChange={handleInputChange} name="HSCTotal" id="HSCTotal" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="HSCPercent" className="form-label">Percentage</label>
            <input type="text" value={formData.HSCPercent || ''} onChange={handleInputChange} className="form-control" name="HSCPercent" id="HSCPercent" disabled={!isEditing} />
          </div>
        </div>
        <br />
        <div className='row mb-3'>
          <div className="col">
            <label htmlFor="Medium" className="form-label">Medium Of Instruction In School</label>
            <input type="text" value={formData.Medium || ''} onChange={handleInputChange} className="form-control" name="Medium" id="Medium" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="MathSsc" className="form-label">Marks Obtained in Mathematics(10th)</label>
            <input type="text" value={formData.MathSsc || ''} onChange={handleInputChange} className="form-control" name="MathSsc" id="MathSsc" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="MathsHsc" className="form-label">Marks Obtained in Mathematics(12th)</label>
            <input type="text" value={formData.MathsHsc || ''} onChange={handleInputChange} className="form-control" name="MathsHsc" id="MathsHsc" disabled={!isEditing} />
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="container text-center">
        <h3>Result Of Graduation</h3>
        <br />
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="YearOfPassingUg" className="form-label">Year of Passing </label>
            <input type="text" value={formData.YearOfPassingUg || ''} onChange={handleInputChange} className="form-control" name="YearOfPassingUg" id="YearOfPassingUg" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="NameOfUgCollege" className="form-label">Name of College </label><br />
            <input type="text" value={formData.NameOfUgCollege || ''} onChange={handleInputChange} name="NameOfUgCollege" id="NameOfUgCollege" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="University" className="form-label">Name of University</label>
            <input type="text" value={formData.University || ''} onChange={handleInputChange} className="form-control" name="University" id="University" disabled={!isEditing} />
          </div>

        </div>
        <div className="row mb-3">

          <div className="col">
            <label htmlFor="GraduationMarks" className="form-label">Marks Obtained</label>
            <input type="text" value={formData.GraduationMarks || ''} onChange={handleInputChange} className="form-control" name="GraduationMarks" id="GraduationMarks" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="GraduationTotal" className="form-label">Out Of </label><br />
            <input type="text" value={formData.GraduationTotal || ''} onChange={handleInputChange} name="GraduationTotal" id="GraduationTotal" className="form-control" disabled={!isEditing} />
          </div>
          <div className="col">
            <label htmlFor="GraduationPercent" className="form-label">Percentage</label>
            <input type="text" value={formData.GraduationPercent || ''} onChange={handleInputChange} className="form-control" name="GraduationPercent" id="GraduationPercent" disabled={!isEditing} />
          </div>
        </div>


        <br />

        <Link to="/Home"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>

        {!isEditing ? (
          <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

        ) : (
          <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
        )}

        <Link to="/fees_address_parents"><button type="button" className="btn btn-primary mx-2">Next</button></Link>
        <br />
        <br />
      </div>
</>)}
    </>
  )
}

export default PreviousAcademicResults