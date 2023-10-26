import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const Training = () => {

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
            const response = await fetch('http://localhost:5000/api/student/fetchTrainingPlacement', requestOptions);
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

            const response = await fetch('http://localhost:5000/api/student/saveTrainingPlacement', requestOptions);

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
                
                <br/>
                <h3>Training Courses done</h3><br />
                <div className="row mb-4">
                    <div className="col">
                        Sr.No
                    </div>
                    <div className="col">
                        Name Of Course
                    </div>
                    <div className="col">
                        Details
                    </div>
                    <div className="col">
                        Month & Year
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col  ">
                        1
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseName1} onChange={handleInputChange} name="CourseName1" id="CourseName1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseDetails1} onChange={handleInputChange} name="CourseDetails1" id="CourseDetails1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="month" className="form-control" value={'' || formData.CourseDate1} onChange={handleInputChange} name="CourseDate1" id="CourseDate1" disabled={!isEditing} />
                    </div>
                </div>

                <div className="row  mb-4">
                    <div className="col">
                        2
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseName2} onChange={handleInputChange} name="CourseName2" id="CourseName2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseDetails2} onChange={handleInputChange} name="CourseDetails2" id="CourseDetails2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="month" className="form-control" value={'' || formData.CourseDate2} onChange={handleInputChange} name="CourseDate2" id="CourseDate2" disabled={!isEditing} />
                    </div>
                </div>

                <div className="row  mb-4">
                    <div className="col">
                        3
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseName3} onChange={handleInputChange} name="CourseName3" id="CourseName3" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CourseDetails3} onChange={handleInputChange} name="CourseDetails3" id="CourseDetails3" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="month" className="form-control" value={'' || formData.CourseDate3} onChange={handleInputChange} name="CourseDate3" id="CourseDate3" disabled={!isEditing} />
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <div className="container text-center">
                <br />
                <h3>Internship Record</h3><br />
                <div className="row mb-6">
                    <div className="col">
                        Sr.No
                    </div>
                    <div className="col">
                        Name Of Company
                    </div>
                    <div className="col">
                        Address
                    </div>
                    <div className="col">
                        Post
                    </div>
                    <div className="col">
                        Stipend
                    </div>
                    <div className="col">
                        Duration(in Months)
                    </div>
                </div>
                <br />
                <div className="row mb-6">
                    <div className="col">
                        1
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CName1} onChange={handleInputChange} name="CName1" id="CName1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CAddress1} onChange={handleInputChange} name="CAddress1" id="CAddress1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.P1} onChange={handleInputChange} name="P1" id="P1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.Stipend1} onChange={handleInputChange} name="Stipend1" id="Stipend1" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" value={'' || formData.Duration1} onChange={handleInputChange} name="Duration1" id="Duration1" disabled={!isEditing} />
                    </div>
                </div>
                <br />
                <div className="row mb-6">
                <div className="col">
                        2
                    </div>
                <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CName2} onChange={handleInputChange} name="CName2" id="CName2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.CAddress2} onChange={handleInputChange} name="CAddress2" id="CAddress2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.P2} onChange={handleInputChange} name="P2" id="P2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={'' || formData.Stipend2} onChange={handleInputChange} name="Stipend2" id="Stipend2" disabled={!isEditing} />
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" value={'' || formData.Duration2} onChange={handleInputChange} name="Duration2" id="Duration2" disabled={!isEditing} />
                    </div>
                </div>
                </div>
                <br />
                <hr />
                <div className="container text-center">
                    <br />
                    <h3>Placement Record</h3><br />
                    <div className="row mb-6">
                        <div className="col">
                            Sr.No
                        </div>
                        <div className="col">
                            Name Of Company
                        </div>
                        <div className="col">
                            Address
                        </div>
                        <div className="col">
                            Post
                        </div>
                        <div className="col">
                            Package
                        </div>
                        <div className="col">
                            Date of Joining
                        </div>
                    </div>
                    <br />
                    <div className="row mb-6">
                        <div className="col">
                            1
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyName1} onChange={handleInputChange} name="CompanyName1" id="CompanyName1" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyAddress1} onChange={handleInputChange} name="CompanyAddress1" id="CompanyAddress1" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.Post1} onChange={handleInputChange} name="Post1" id="Post1" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyCTC1} onChange={handleInputChange} name="CompanyCTC1" id="CompanyCTC1" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" value={'' || formData.DateOfJoining1} onChange={handleInputChange} name="DateOfJoining1" id="DateOfJoining1" disabled={!isEditing} />
                        </div>
                    </div>
                    <br />
                    <div className="row mb-6">
                        <div className="col">
                            2
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyName2} onChange={handleInputChange} name="CompanyName2" id="CompanyName2" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyAddress2} onChange={handleInputChange} name="CompanyAddress2" id="CompanyAddress2" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.Post2} onChange={handleInputChange} name="Post2" id="Post2" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" value={'' || formData.CompanyCTC2} onChange={handleInputChange} name="CompanyCTC2" id="CompanyCTC2" disabled={!isEditing} />
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" value={'' || formData.DateOfJoining2} onChange={handleInputChange} name="DateOfJoining2" id="DateOfJoining2" disabled={!isEditing} />
                        </div>
                    </div>
                    <br />

                    <Link to="/achievements"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>

                    {!isEditing ? (
                        <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

                    ) : (
                        <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
                    )}
                    <Link to="/research"><button type="button" className="btn btn-primary mx-2">Next</button></Link>
                    <br /><br />
                </div>
                <br />
                </>)}
            </>
            )
}

            export default Training
