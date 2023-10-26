import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const FeeAddressParents = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

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
            const response = await fetch('http://localhost:5000/api/student/fetchFeeAddParents', requestOptions);
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

            const response = await fetch('http://localhost:5000/api/student/saveFeeAddParents', requestOptions);

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
           {loading ? (<Loading/> ): (<><div className="container text-center">
                <br />
                <h3>Date And Status Of Fees Paid</h3>
                <br />
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="MentorName" className="form-label">Name Of Mentor</label>
                        <input type="text" value={formData.MentorName || ''} onChange={handleInputChange} className="form-control" name="MentorName" id="MentorName" disabled={!isEditing} />
                    </div>

                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="FyFees" className="form-label">FY Fees Paid</label>
                        <input type="text" value={formData.FyFees || ''} onChange={handleInputChange} className="form-control" name="FyFees" id="FyFees" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <label htmlFor="DateFyFees" className="form-label">FY Fees Paying Date</label>
                        <input type="date" value={formData.DateFyFees || ''} onChange={handleInputChange} className="form-control" name="DateFyFees" id="DateFyFees" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <label htmlFor="SyFees" className="form-label">SY Fees Paid </label><br />
                        <input type="text" value={formData.SyFees || ''} onChange={handleInputChange} name="SyFees" id="SyFees" className="form-control" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <label htmlFor="DateSyFees" className="form-label">SY Fees Paying Date</label>
                        <input type="date" value={formData.DateSyFees || ''} onChange={handleInputChange} className="form-control" name="DateSyFees" id="DateSyFees" disabled={!isEditing} />
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <div className="container text-center">
                <br />
                <h3>Address Information</h3>
                <br />
                <div className="row">

                    <label htmlFor="TemopraryAddress" className="form-label">Temporary Address</label>
                    <input type="text" className="form-control" name="TemporaryAddress" value={formData.TemporaryAddress || ''} onChange={handleInputChange} id="TemporaryAddress" disabled={!isEditing} />

                </div>
                <div className="row">

                    <label htmlFor="PermanentAddress" className="form-label">Permanent Address</label>
                    <input type="text" className="form-control" name="PermanentAddress" value={formData.PermanentAddress || ''} onChange={handleInputChange} id="PermanentAddress" disabled={!isEditing} />

                </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="container text-center">

                <h3>Parents Information</h3>
                <br />
                <div className='row mb-2'>
                    <div className='col'>
                        <h4>Father's Info</h4>
                        <label htmlFor="FatherName" className="form-label">Name</label>
                        <input type="text" className="form-control" name="FatherName" value={formData.FatherName || ''} onChange={handleInputChange} id="FatherName" disabled={!isEditing} />
                        <label htmlFor="FatherProfession" className="form-label">Profession</label>
                        <input type="text" className="form-control" name="FatherProfession" value={formData.FatherProfession || ''} onChange={handleInputChange} id="FatherProfession" disabled={!isEditing} />
                        <label htmlFor="FatherWorkAddress" className="form-label">Address Of Workplace</label>
                        <input type="text" className="form-control" name="FatherWorkAddress" value={formData.FatherWorkAddress || ''} onChange={handleInputChange} id="FatherWorkAddress" disabled={!isEditing} />
                        <label htmlFor="FatherContact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="FatherContact" value={formData.FatherContact || ''} onChange={handleInputChange} id="FatherContact" disabled={!isEditing} />
                        <label htmlFor="FatherEmail" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="FatherEmail" value={formData.FatherEmail || ''} onChange={handleInputChange} id="FatherEmail" disabled={!isEditing} />
                    </div>
                    <div className='col'>
                        <h4>Mother's Info</h4>
                        <label htmlFor="MotherName" className="form-label">Name</label>
                        <input type="text" className="form-control" name="MotherName" value={formData.MotherName || ''} onChange={handleInputChange} id="MotherName" disabled={!isEditing} />
                        <label htmlFor="MotherProfession" className="form-label">Profession</label>
                        <input type="text" className="form-control" name="MotherProfession" value={formData.MotherProfession || ''} onChange={handleInputChange} id="MotherProfession" disabled={!isEditing} />
                        <label htmlFor="MotherWorkAddress" className="form-label">Address Of Workplace</label>
                        <input type="text" className="form-control" name="MotherWorkAddress" value={formData.MotherWorkAddress || ''} onChange={handleInputChange} id="MotherWorkAddress" disabled={!isEditing} />
                        <label htmlFor="MotherContact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="MotherContact" value={formData.MotherContact || ''} onChange={handleInputChange} id="MotherContact" disabled={!isEditing} />
                        <label htmlFor="MotherEmail" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="MotherEmail" value={formData.MotherEmail || ''} onChange={handleInputChange} id="MotherEmail" disabled={!isEditing} />
                    </div>
                </div>

                <br />

                <Link to="/previous_academic_results"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>

                {!isEditing ? (
                    <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

                ) : (
                    <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
                )}

                <Link to="/mcaResult"><button type="button" className="btn btn-primary mx-2">Next</button></Link>

                <br />
                <br />





            </div></>)}


        </>
    )
}

export default FeeAddressParents
