import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Loading from './loading';

const YearResult = () => {
    const [loading, setLoading] = useState(true);
    const [yclass, setYclass] = useState([]);
    const [marksObtained, setMarksObtained] = useState([]);
    const [marksTotal, setMarksTotal] = useState([]);
    const [percentage, setPercentage] = useState([]);
    const [cgpa, setCgpa] = useState([]);
    const [yearofpassing, setYearofpassing] = useState([]);
    const [c , setC] = useState([]);
    const [o , setO] = useState([]);
    const [t , setT] = useState([]);
    const [p , setP] = useState([]);
    const [s , setS] = useState([]);
    const [y , sety] = useState([]);





    const addYear = async () => {
        const newSemester = {
            yclass : [yclass],
            marksObtained : [marksObtained],
            marksTotal: [marksTotal],
            percentage: [percentage],
            CGPA : [cgpa],
            Yearofpassing : [yearofpassing]
        };

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
                body: JSON.stringify(newSemester),
            };

            const response = await fetch('http://localhost:5000/api/student/saveYear', requestOptions);

            if (response.ok) {
                // Request was successful
                // Disable editing mode

                alert('Data saved successfully');
                window.location.reload();
            } else {
                // Handle non-successful response (e.g., 4xx or 5xx status)
                console.error('Error updating data:', response.status, response.statusText);
                alert("Details incomplete or User not logged in")
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    useEffect(() => {
        // Fetch data from MongoDB when the component mounts
        fetchData();
    }, []);

    const deleteData = async () => {
       
        try {
            // Send a POST request to update data in MongoDB
            const authToken = localStorage.getItem('token');

            const headers = {
                'auth-token': authToken,
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(),
            };

            const response = await fetch('http://localhost:5000/api/student/deleteYear', requestOptions);

            if (response.ok) {
                // Request was successful
                // Disable editing mode

                alert('Data deleted successfully');
                window.location.reload();
            } else {
                // Handle non-successful response (e.g., 4xx or 5xx status)
                console.error('Error updating data:', response.status, response.statusText);
                alert("Details incomplete or User not logged in")
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

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
            const response = await fetch('http://localhost:5000/api/student/fetchYear', requestOptions);

            // Check if the response status is OK (200)
            if (response.ok) {
                // Parse the JSON response
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.length === 0) {
                    // Handle the case when the array is empty (e.g., display a message or do nothing)
                    console.log('Received an empty array.');
                } else {
                    // Set the form data from the response data

                    
                    setC(await responseData.formData[0].yclass);
                    setO(await responseData.formData[0].marksObtained);
                    setT(await responseData.formData[0].marksTotal); // Assuming responseData is an array
                    setP(await responseData.formData[0].percentage);
                    setS(await responseData.formData[0].CGPA);
                    sety(await responseData.formData[0].Yearofpassing);
                }
            } else {
                // Handle non-successful response (e.g., 4xx or 5xx status)
                console.error('Error fetching data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };






    return (
        <>
            <Sidenav />
          
            {loading ? (<Loading/>) : (<>
                <div className="container text-center ">
                    
                    <h1>Academic Result</h1>
                    <br/>
                    <form onSubmit={addYear}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="yclass" className="form-label">Class (FY, SY, FE, SE, TE, BE) / Semester</label>
                            <input type="text" value={yclass} onChange={(e) => setYclass(e.target.value)} className="form-control" name="yclass" id="yclass" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="marksObtained" className="form-label">MarksObtained</label>
                            <input type="number" value={marksObtained} onChange={(e) => setMarksObtained(e.target.value)} className="form-control" name="marksObtained" id="marksObtained" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="marksTotal" className="form-label">Total Marks</label>
                            <input type="number" value={marksTotal} onChange={(e) => setMarksTotal(e.target.value)} className="form-control" name="marksTotal" id="marksTotal" required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="percentage" className="form-label">Percentage</label>
                            <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} className="form-control" name="percentage" id="percentage" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="cgpa" className="form-label">CGPA / SGPA</label>
                            <input type="number" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="form-control" name="cgpa" id="cgpa" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="yearofpassing" className="form-label">Month & Year of Passing</label>
                            <input type="month" value={yearofpassing} onChange={(e) => setYearofpassing(e.target.value)} className="form-control" name="yearofpassing" id="yearofpassing" required/>
                        </div>
                        
                    </div>

                    <button className='btn btn-primary' type='submit'>Save</button>

                    </form>
                    <br/>
                    <Link to="/mcaResult"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>

                    <Link to="/achievements"><button type="button" className="btn btn-primary mx-2">Next</button></Link>
                    <button className='btn btn-danger mx-2' onClick={deleteData}>Delete the details</button>
                    <br />
                    <hr />


                    <table className='table border'>
                        <thead>
                            <tr>
                                <th scope="col">Class / Semester</th>
                                <th scope="col">Marks Obtained</th>
                                <th scope="col">Total Marks</th>
                                <th scope="col">Percentage</th>
                                <th scope="col">CGPA /SGPA</th>
                                <th scope="col">Passing Month & Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {c.map((c, index) => (
                                <tr key={index}>
                                    <td>{c}</td>
                                    <td>{o[index]}</td>
                                    <td>{t[index]}</td>
                                    <td>{p[index]}</td>
                                    <td>{s[index]}</td>
                                    <td>{y[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>








                </div>

                <br />



                <br />



            </>)}

        </>
    )
}

export default YearResult
