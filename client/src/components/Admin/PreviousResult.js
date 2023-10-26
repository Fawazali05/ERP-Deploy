// client/src/components/DownloadButton.js

import React, { useState } from 'react';
import Sidenav from './sideNavbar';

const PreviousResult = (e) => {
  const [mcaprn, setMcaprn] = useState("");
  const [formData, setFormData] = useState({});


  const handleInputChange = (e) => {
    setMcaprn(e.target.value);
  };
  const handleFetchDataClick = () => {
    // Make an HTTP request to the server route to fetch student data
    fetch(`http://localhost:5000/api/data/fetchpreviousResults/${mcaprn}`)
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
    fetch(`http://localhost:5000/api/files/download/previousAcademicResults?AdmissionYear=${year}`,requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob data
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'previousresults.csv'; // Set the desired filename
        document.body.appendChild(a);
        a.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading collection:', error);
      });
  };

  return (
    <>
      <Sidenav />
      <form onSubmit={handleDownloadClick} >
        <div className="container text-center">
          <h3 id="sv">Previous Academic Results All Students</h3>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="year" className="form-label">Enter the Year Of Admission </label>
              <input type="text" value={year}  onChange={(e) => setYear(e.target.value)} className="form-control" name="year" id="year" />
            </div>

          </div>

          <button type="submit" className='btn btn-primary'>Download (CSV)</button>


        </div>
      </form>
      <br/>
      <hr/>
      <br/>
      
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
         <br/>
          
        </div>
        <div className="container text-center">
            <button className='btn btn-primary' onClick={handleFetchDataClick}>Fetch Student Data</button>
          </div>

        <div className="container text-center">
          <br />
          <h3>Result 10th And 12th</h3>
          <br />
          <div className="row mb-6">
            <div className="col">
              <label htmlFor="SSCYear" className="form-label">Year of Passing 10th</label>
              <input type="text" value={formData.SSCYear || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="SSCYear" id="SSCYear"   />
            </div>
            <div className="col">
              <label htmlFor="SSCSchool" className="form-label">Name of School </label><br />
              <input type="text" value={formData.SSCSchool || ''} disabled="true"  onChange={handleInputChange} name="SSCSchool" id="SSCSchool" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="SSCBoard" className="form-label">Name of Board</label>
              <input type="text" value={formData.SSCBoard || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="SSCBoard" id="SSCBoard"   />
            </div>
            <div className="col">
              <label htmlFor="SSCMarks" className="form-label">Marks Obtained</label>
              <input type="text" value={formData.SSCMarks || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="SSCMarks" id="SSCMarks"   />
            </div>
            <div className="col">
              <label htmlFor="SSCTotal" className="form-label">Out Of </label><br />
              <input type="text" value={formData.SSCTotal || ''} disabled="true"  onChange={handleInputChange} name="SSCTotal" id="SSCTotal" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="SSCPercent" className="form-label">Percentage</label>
              <input type="text" value={formData.SSCPercent || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="SSCPercent" id="SSCPercent"   />
            </div>
          </div>
          <br />
          <div className="row mb-6">
            <div className="col">
              <label htmlFor="HSCYear" className="form-label">Year of Passing 12th</label>
              <input type="text" value={formData.HSCYear || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="HSCYear" id="HSCYear"   />
            </div>
            <div className="col">
              <label htmlFor="HSCSchool" className="form-label">Name of School </label><br />
              <input type="text" value={formData.HSCSchool || ''} disabled="true"  onChange={handleInputChange} name="HSCSchool" id="HSCSchool" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="HSCBoard" className="form-label">Name of Board</label>
              <input type="text" value={formData.HSCBoard || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="HSCBoard" id="HSCBoard"   />
            </div>
            <div className="col">
              <label htmlFor="HSCMarks" className="form-label">Marks Obtained</label>
              <input type="text" value={formData.HSCMarks || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="HSCMarks" id="HSCMarks"   />
            </div>
            <div className="col">
              <label htmlFor="HSCTotal" className="form-label">Out Of </label><br />
              <input type="text" value={formData.HSCTotal || ''} disabled="true"  onChange={handleInputChange} name="HSCTotal" id="HSCTotal" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="HSCPercent" className="form-label">Percentage</label>
              <input type="text" value={formData.HSCPercent || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="HSCPercent" id="HSCPercent"   />
            </div>
          </div>
          <br />
          <div className='row mb-3'>
            <div className="col">
              <label htmlFor="Medium" className="form-label">Medium Of Instruction In School</label>
              <input type="text" value={formData.Medium || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="Medium" id="Medium"   />
            </div>
            <div className="col">
              <label htmlFor="MathSsc" className="form-label">Marks Obtained in Mathematics(10th)</label>
              <input type="text" value={formData.MathSsc || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="MathSsc" id="MathSsc"   />
            </div>
            <div className="col">
              <label htmlFor="MathsHsc" className="form-label">Marks Obtained in Mathematics(12th)</label>
              <input type="text" value={formData.MathsHsc || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="MathsHsc" id="MathsHsc"   />
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
              <input type="text" value={formData.YearOfPassingUg || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="YearOfPassingUg" id="YearOfPassingUg"   />
            </div>
            <div className="col">
              <label htmlFor="NameOfUgCollege" className="form-label">Name of College </label><br />
              <input type="text" value={formData.NameOfUgCollege || ''} disabled="true"  onChange={handleInputChange} name="NameOfUgCollege" id="NameOfUgCollege" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="University" className="form-label">Name of University</label>
              <input type="text" value={formData.University || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="University" id="University"   />
            </div>

          </div>
          <div className="row mb-3">

            <div className="col">
              <label htmlFor="GraduationMarks" className="form-label">Marks Obtained</label>
              <input type="text" value={formData.GraduationMarks || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="GraduationMarks" id="GraduationMarks"   />
            </div>
            <div className="col">
              <label htmlFor="GraduationTotal" className="form-label">Out Of </label><br />
              <input type="text" value={formData.GraduationTotal || ''} disabled="true"  onChange={handleInputChange} name="GraduationTotal" id="GraduationTotal" className="form-control"   />
            </div>
            <div className="col">
              <label htmlFor="GraduationPercent" className="form-label">Percentage</label>
              <input type="text" value={formData.GraduationPercent || ''} disabled="true"  onChange={handleInputChange} className="form-control" name="GraduationPercent" id="GraduationPercent"   />
            </div>
          </div>
          

          <br />
        </div>

      </div>
    </>

  )
};


export default PreviousResult;
