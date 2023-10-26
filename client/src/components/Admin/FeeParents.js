import React, { useState } from 'react';
import Sidenav from './sideNavbar';

const FeeParents = () => {

    const [year, setYear] = useState("");
    const handleDownloadClick = (e) => {
        e.preventDefault();
        console.log(year);
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


        // Make an HTTP request to the server route for downloading the collection
        fetch(`http://localhost:5000/api/files/download/feeParent?AdmissionYear=${year}`,requestOptions)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a temporary URL for the blob data
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'feeParenrDetails.csv'; // Set the desired filename
                document.body.appendChild(a);
                a.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading collection:', error);
            });
    };
    const [mcaprn, setMcaprn] = useState("");
    const [formData, setFormData] = useState({});


    const handleInputChange = (e) => {
        setMcaprn(e.target.value);
    };

    const handleFetchDataClick = () => {
        // Make an HTTP request to the server route to fetch student data
        fetch(`http://localhost:5000/api/data/fetchFeeParent/${mcaprn}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Update the form data with fetched data
                setFormData(data);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
                alert("Student not found");
            });
    }

    return (
        <>
            <Sidenav />
            <form onSubmit={handleDownloadClick} >
                <div className="container text-center">
                    <h3 id="sv">Fees Address Parents (All Students)</h3>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="year" className="form-label">Enter the Year Of Admission </label>
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" name="year" id="year" />
                        </div>

                    </div>

                    <button type="submit" className='btn btn-primary'>Download (CSV)</button>


                </div>
            </form>
            <br />
            <hr />
            <br />
            <div className="container text-center">
                {/* ... Form structure */}
                <div className="row mb-3">

                    <h3>View Data Of Individual Student</h3>
                    <label htmlFor="mcaprn" className="form-label">Enter mcaprn</label>
                    <input
                        type="text"
                        value={mcaprn}
                        onChange={handleInputChange}
                        className="form-control"
                        name="mcaprn"
                        id="mcaprn"

                    />
                    <br />

                </div>
                <div className="container text-center">
                    <button className='btn btn-primary' onClick={handleFetchDataClick}>Fetch Student Data</button>
                </div>
            </div>
            <br />

            <div className="container text-center">
                <br />
                <h3>Date And Status Of Fees Paid</h3>
                <br />
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="MentorName" className="form-label">Name Of Mentor</label>
                        <input type="text" value={formData.MentorName || ''} onChange={handleInputChange} className="form-control" name="MentorName" id="MentorName" disabled= "true" />
                    </div>

                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="FyFees" className="form-label">FY Fees Paid</label>
                        <input type="text" value={formData.FyFees || ''} onChange={handleInputChange} className="form-control" name="FyFees" id="FyFees" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="DateFyFees" className="form-label">FY Fees Paying Date</label>
                        <input type="date" value={formData.DateFyFees || ''} onChange={handleInputChange} className="form-control" name="DateFyFees" id="DateFyFees" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="SyFees" className="form-label">SY Fees Paid </label><br />
                        <input type="text" value={formData.SyFees || ''} onChange={handleInputChange} name="SyFees" id="SyFees" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="DateSyFees" className="form-label">SY Fees Paying Date</label>
                        <input type="date" value={formData.DateSyFees || ''} onChange={handleInputChange} className="form-control" name="DateSyFees" id="DateSyFees" disabled= "true" />
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
                    <input type="text" className="form-control" name="TemporaryAddress" value={formData.TemporaryAddress || ''} onChange={handleInputChange} id="TemporaryAddress" disabled= "true" />

                </div>
                <div className="row">

                    <label htmlFor="PermanentAddress" className="form-label">Permanent Address</label>
                    <input type="text" className="form-control" name="PermanentAddress" value={formData.PermanentAddress || ''} onChange={handleInputChange} id="PermanentAddress" disabled= "true" />

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
                        <input type="text" className="form-control" name="FatherName" value={formData.FatherName || ''} onChange={handleInputChange} id="FatherName" disabled= "true" />
                        <label htmlFor="FatherProfession" className="form-label">Profession</label>
                        <input type="text" className="form-control" name="FatherProfession" value={formData.FatherProfession || ''} onChange={handleInputChange} id="FatherProfession" disabled= "true" />
                        <label htmlFor="FatherWorkAddress" className="form-label">Address Of Workplace</label>
                        <input type="text" className="form-control" name="FatherWorkAddress" value={formData.FatherWorkAddress || ''} onChange={handleInputChange} id="FatherWorkAddress" disabled= "true" />
                        <label htmlFor="FatherContact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="FatherContact" value={formData.FatherContact || ''} onChange={handleInputChange} id="FatherContact" disabled= "true" />
                        <label htmlFor="FatherEmail" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="FatherEmail" value={formData.FatherEmail || ''} onChange={handleInputChange} id="FatherEmail" disabled= "true" />
                    </div>
                    <div className='col'>
                        <h4>Mother's Info</h4>
                        <label htmlFor="MotherName" className="form-label">Name</label>
                        <input type="text" className="form-control" name="MotherName" value={formData.MotherName || ''} onChange={handleInputChange} id="MotherName" disabled= "true" />
                        <label htmlFor="MotherProfession" className="form-label">Profession</label>
                        <input type="text" className="form-control" name="MotherProfession" value={formData.MotherProfession || ''} onChange={handleInputChange} id="MotherProfession" disabled= "true" />
                        <label htmlFor="MotherWorkAddress" className="form-label">Address Of Workplace</label>
                        <input type="text" className="form-control" name="MotherWorkAddress" value={formData.MotherWorkAddress || ''} onChange={handleInputChange} id="MotherWorkAddress" disabled= "true" />
                        <label htmlFor="MotherContact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="MotherContact" value={formData.MotherContact || ''} onChange={handleInputChange} id="MotherContact" disabled= "true" />
                        <label htmlFor="MotherEmail" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="MotherEmail" value={formData.MotherEmail || ''} onChange={handleInputChange} id="MotherEmail" disabled= "true" />
                    </div>
                </div>

               
                <br />





            </div>
        </>
    )
}

export default FeeParents
