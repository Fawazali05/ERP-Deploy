import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const Achievements = () => {
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
            const response = await fetch('http://localhost:5000/api/student/fetchAchievements', requestOptions);
            //console.log(response);
            // Check if the response status is OK (200)
            if (response.ok) {
                // Parse the JSON response
                const responseData = await response.json();
                if (responseData.formData === 0) {
                    // Handle the case when the array is empty (e.g., display a message or do nothing)
                    console.log('Received an empty array.');
                    setLoading(false);
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

            const response = await fetch('http://localhost:5000/api/student/saveAchievements', requestOptions);

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
            {loading ? (<Loading />) : (
                <>
                    <div className="container text-center">
                        <br />

                        <br />
                        <h3>Achievements</h3><br />

                        <div className="row">
                            <div className="col">
                                Sr.No
                            </div>
                            <div className="col">
                                Type
                            </div>
                            <div className="col">
                                Level
                            </div>
                            <div className="col">
                                Details
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                1
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Type1} onChange={handleInputChange} name="Type1" id="Type1" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-Technical</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Any Other</option>
                                </select>

                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Level1} onChange={handleInputChange} name="Level1" id="Level1" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Collegiate">Collegiate</option>
                                    <option value="Inter-Collegiate">Inter-Collegiate</option>
                                    <option value="State">State</option>
                                    <option value="National">National</option>
                                    <option value="International">International</option>
                                </select>

                            </div>
                            <div className="col">
                                <textarea type="text" className="form-control" value={'' || formData.Description1} onChange={handleInputChange} name="Description1" id="Description1" disabled={!isEditing} />
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                2
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Type2} onChange={handleInputChange} name="Type2" id="Type2" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-Technical</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Any Other</option>
                                </select>

                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Level2} onChange={handleInputChange} name="Level2" id="Level2" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Collegiate">Collegiate</option>
                                    <option value="Inter-Collegiate">Inter-Collegiate</option>
                                    <option value="State">State</option>
                                    <option value="National">National</option>
                                    <option value="International">International</option>
                                </select>

                            </div>
                            <div className="col">
                                <textarea type="text" className="form-control" value={'' || formData.Description2} onChange={handleInputChange} name="Description2" id="Description2" disabled={!isEditing} />
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                3
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Type3} onChange={handleInputChange} name="Type3" id="Type3" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-Technical</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Any Other</option>
                                </select>

                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Level3} onChange={handleInputChange} name="Level3" id="Level3" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Collegiate">Collegiate</option>
                                    <option value="Inter-Collegiate">Inter-Collegiate</option>
                                    <option value="State">State</option>
                                    <option value="National">National</option>
                                    <option value="International">International</option>
                                </select>

                            </div>
                            <div className="col">
                                <textarea type="text" className="form-control" value={'' || formData.Description3} onChange={handleInputChange} name="Description3" id="Description3" disabled={!isEditing} />
                            </div>

                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                4
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Type4} onChange={handleInputChange} name="Type4" id="Type4" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-Technical</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Any Other</option>
                                </select>

                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Level4} onChange={handleInputChange} name="Level4" id="Level4" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Collegiate">Collegiate</option>
                                    <option value="Inter-Collegiate">Inter-Collegiate</option>
                                    <option value="State">State</option>
                                    <option value="National">National</option>
                                    <option value="International">International</option>
                                </select>

                            </div>
                            <div className="col">
                                <textarea type="text" className="form-control" value={'' || formData.Description4} onChange={handleInputChange} name="Description4" id="Description4" disabled={!isEditing} />
                            </div>

                        </div>
                        <br />

                        <div className="row">
                            <div className="col">
                                5
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Type5} onChange={handleInputChange} name="Type5" id="Type5" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-Technical</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Any Other</option>
                                </select>

                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.Level5} onChange={handleInputChange} name="Level5" id="Level5" disabled={!isEditing}>
                                    <option value="">Select an option</option>
                                    <option value="Collegiate">Collegiate</option>
                                    <option value="Inter-Collegiate">Inter-Collegiate</option>
                                    <option value="State">State</option>
                                    <option value="National">National</option>
                                    <option value="International">International</option>
                                </select>

                            </div>
                            <div className="col">
                                <textarea type="text" className="form-control" value={'' || formData.Description5} onChange={handleInputChange} name="Description5" id="Description5" disabled={!isEditing} />
                            </div>

                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="container text-center">
                        <br />
                        <h3>Competitive Examinations</h3>
                        <br />
                        <div className="row mb-5">
                            <div className="col">
                                Sr.No
                            </div>
                            <div className="col">
                                Name Of Exam
                            </div>
                            <div className="col">
                                Valid/Invalid
                            </div>
                            <div className="col">
                                Score(obtained/out of)
                            </div>
                            <div className="col">
                                Month & Year
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                1
                            </div>
                            <div className="col">
                                GATE
                            </div>
                            <div className="col">

                                <select className="form-select" value={'' || formData.GATEValidity} onChange={handleInputChange} name="GATEValidity" id="GATEValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>

                                </select>

                            </div>
                            <div className="col">
                                <input type="text" value={'' || formData.GATEScore} onChange={handleInputChange} name="GATEScore" id="GATEScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.GateDate} onChange={handleInputChange} name="GateDate" id="GateDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                2
                            </div>
                            <div className="col">
                                CAT
                            </div>
                            <div className="col">
                                <select className="form-select" value={'' || formData.CATValidity} onChange={handleInputChange} name="CATValidity" id="CATValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>
                                </select>
                            </div>
                            <div className="col">
                                <input type="text" value={'' || formData.CATScore} onChange={handleInputChange} name="CATScore" id="CATScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.CATDate} onChange={handleInputChange} name="CATDate" id="CATDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                3
                            </div>
                            <div className="col">
                                GRE
                            </div>
                            <div className="col">
                                <select className="form-select" value={'' || formData.GREValidity} onChange={handleInputChange} name="GREValidity" id="GREValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>
                                </select>
                            </div>
                            <div className="col">
                                <input type="text" value={'' || formData.GREScore} onChange={handleInputChange} name="GREScore" id="GREScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.GREDate} onChange={handleInputChange} name="GREDate" id="GREDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                4
                            </div>
                            <div className="col">
                                MPSC
                            </div>
                            <div className="col">
                                <select className="form-select" value={'' || formData.MPSCValidity} onChange={handleInputChange} name="MPSCValidity" id="MPSCValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>
                                </select>
                            </div>
                            <div className="col">
                                <input type="text" value={'' || formData.MPSCScore} onChange={handleInputChange} name="MPSCScore" id="MPSCScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.MPSCDate} onChange={handleInputChange} name="MPSCDate" id="MPSCDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                5
                            </div>
                            <div className="col">
                                UPSC
                            </div>
                            <div className="col">
                                <select className="form-select" value={'Invalid' || formData.UPSCValidity} onChange={handleInputChange} name="UPSCValidity" id="UPSCValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>
                                </select>
                            </div>
                            <div className="col">
                                <input type="text" value={'' || formData.UPSCScore} onChange={handleInputChange} name="UPSCScore" id="UPSCScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.UPSCDate} onChange={handleInputChange} name="UPSCDate" id="UPSCDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col">
                                6
                            </div>
                            <div className="col">

                                Other Exam <input type="text" value={'' || formData.OtherExam} onChange={handleInputChange} name="OtherExam" id="OtherExam" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <select className="form-select" value={'' || formData.OtherExamValidity} onChange={handleInputChange} name="OtherExamValidity" id="OtherExamValidity" disabled={!isEditing}>
                                    <option value="Invalid">Invalid</option>
                                    <option value="Valid">Valid</option>
                                </select>
                            </div>

                            <div className="col">
                                <input type="text" value={'' || formData.OtherExamScore} onChange={handleInputChange} name="OtherExamScore" id="OtherExamScore" className="form-control" disabled={!isEditing} />
                            </div>
                            <div className="col">
                                <input type="month" value={'' || formData.OtherExamDate} onChange={handleInputChange} name="OtherExamDate" id="OtherExamDate" className="form-control" disabled={!isEditing} />
                            </div>
                        </div>
                        <br />

                        <Link to="/mcaResult"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>

                        {!isEditing ? (
                            <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>

                        ) : (
                            <button className='btn btn-primary' onClick={handleSaveClick}>Save</button>
                        )}

                        <Link to="/training"><button type="button" className="btn btn-primary mx-2">Next</button></Link>

                        <br />
                        <br />
                    </div>
                </>)}
        </>
    )
}

export default Achievements
