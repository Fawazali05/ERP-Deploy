import React, { useState } from 'react';
import Sidenav from './sideNavbar';



const StudentDataCard = () => {
  /*  const [isPrinted, setIsPrinted] = useState(false);
   //print logic 
   const handlePrint = async () => {
     await setIsPrinted(true);
     await window.print(); // Trigger the print dialog
     setIsPrinted(false)
   } */
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [year1, setYear1] = useState("");
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
    fetch(`http://localhost:5000/api/files/download/studentDataCard?AdmissionYear=${year}`,requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob data
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'studentpersonalinfo.csv'; // Set the desired filename
        document.body.appendChild(a);
        a.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading collection:', error);
      });
  };
  const [formData, setFormData] = useState([]);




  /*  const handleInputChange = (e) => {
     setMcaprn(e.target.value);
   }; */

  const fetchReport = async (e) => {
    e.preventDefault();
    try {
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
      const response = await fetch(`http://localhost:5000/api/data/fetchStudentDataCard/${year1}/${dept}`, requestOptions);
      // console.log(response);
      //console.log(typeof(response));
      // Check if the response status is OK (200)
      if (response.ok) {
        const responseData = await response.json();
        await setFormData( responseData.formData);
        console.log(formData);

      } else {
        alert("Data not Available");

      }

    } catch (error) {
      alert("Data not Available");
      console.error('Error fetching data:', error);
    } finally {
      //setLoading(false); // Set loading to false regardless of success or error
    }
  };


  return (
    <>{/* <div id='I1' hidden={isPrinted}> */}
      <Sidenav />

      <form onSubmit={handleDownloadClick} >
        <div className="container text-center">
          <h3 id="sv">Student Data Card (All Students)</h3>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="year" className="form-label">Enter the Year Of Admission </label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" name="year" id="year" />
            </div>

          </div>


          <button type="submit" className='btn btn-primary mx-2'>Download (CSV)</button>



        </div>
      </form>

      <hr />
      <div className='container text-center'>
        <h3 id="sv">Student Profile(All Students)</h3>
        <br />
        <div className="row mb-2">
          <div className="col">
          <label htmlFor="year1" className="form-label">Enter the Year Of Admission </label>
          <input type="text" value={year1} onChange={(e) => setYear1(e.target.value)} className="form-control" name="year1" id="year1" /><br />
         
          </div>
          <div className="col">
            <label htmlFor="dept" className="form-label">Select the Department </label>
            <select className="form-select" value={dept} onChange={(e) => setDept(e.target.value)} name="dept" id="dept">
              <option value="">Select an option</option>
              <option value="MCA">MCA</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="AIML">AIML</option>
              <option value="ENTC">ENTC</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
          </div>
           
          <br />
          <button className='btn btn-primary' onClick={fetchReport}>Fetch Student Data</button>
          <br />
          <hr />
          <br />


          <table className='table border'>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">REG NO</th>
                <th scope="col">Admission Year</th>
                <th scope='col'>Department</th>

              </tr>
            </thead>
            {formData ? (<>   <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Name}</td>
                  <td>{data.mcaprn}</td>
                  <td>{data.AdmissionYear}</td>
                  <td>{data.Branch}</td>
                </tr>
              ))}
            </tbody></>) : ""}
          </table>
        </div>
      </>
      )
}

      export default StudentDataCard
