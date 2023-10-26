import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav'
import Loading from './loading';

const McaResult = () => {
    const [loading, setLoading] = useState(true);
    const [semesterNumber, setSemesterNumber] = useState(1);
    const [subject, setSubject] = useState('');
    const [mark, setMark] = useState(0);
    const [semesters, setSemesters] = useState([]);
    const [sub, setSub] = useState([]);
    const [m, setM] = useState([]);
    const [attempt, setAttempt] = useState(1);
    const [at, setAt] = useState([]);
    const [passing, setPassing] = useState('');
    const [pdate, setPdate] = useState([]);
    const [outof, setOutof] = useState(100);
    const [out, setOut] = useState([]);




    const addSemester = async () => {
        const newSemester = {
            semesterNumber : [semesterNumber],
            attempt : [attempt],
            subjects: [subject],
            marks: [mark],
            outof : [outof],
            passing : [passing]
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

            const response = await fetch('http://localhost:5000/api/student/saveMcaResults', requestOptions);

            if (response.status === "OK") {
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

            const response = await fetch('http://localhost:5000/api/student/deleteMcaResults', requestOptions);

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
            const response = await fetch('http://localhost:5000/api/student/fetchMcaResults', requestOptions);

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

                    setSemesters(await responseData.formData[0].semesterNumber);
                    setAt(await responseData.formData[0].attempt);
                    setSub(await responseData.formData[0].subjects);
                    setM(await responseData.formData[0].marks); // Assuming responseData is an array
                    setOut(await responseData.formData[0].outof);
                    setPdate(await responseData.formData[0].passing);

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
                    <h1>Semester Examination Result</h1>
                    <br/>
                    <form onSubmit={addSemester}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="semesterNumber" className="form-label">Number of Semester</label>
                            <input type="number" value={semesterNumber} onChange={(e) => setSemesterNumber(e.target.value)} className="form-control" name="semesterNumber" id="semesterNumber" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="attempt" className="form-label">Number of Attempts</label>
                            <input type="number" value={attempt} onChange={(e) => setAttempt(e.target.value)} className="form-control" name="attempt" id="attempt" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="subjects" className="form-label">Name of Subject</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" name="subjects" id="subjects" required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="marks" className="form-label">Marks Obtained</label>
                            <input type="number" value={mark} onChange={(e) => setMark(e.target.value)} className="form-control" name="marks" id="marks" />
                        </div>
                        <div className="col">
                            <label htmlFor="outof" className="form-label">Out Of</label>
                            <input type="number" value={outof} onChange={(e) => setOutof(e.target.value)} className="form-control" name="outof" id="outof" />
                        </div>
                        <div className="col">
                            <label htmlFor="passing" className="form-label">Month And Year of Passing</label>
                            <input type="month" value={passing} onChange={(e) => setPassing(e.target.value)} className="form-control" name="passing" id="passing" required/>
                        </div>
                        
                    </div>

                    <button className='btn btn-primary' type='submit'>Save</button>
                    </form>
                    <br/>
                    <Link to="/fees_address_parents"><button type="button" className="btn btn-primary mx-2">Previous</button></Link>
                    <Link to="/yearResult"><button type="button" className="btn btn-primary mx-2">Next</button></Link>

                    <button className='btn btn-danger mx-2' onClick={deleteData}>Delete the details</button>
                    <br />
                    <hr />


                    <table className='table border'>
                        <thead>
                            <tr>
                                <th scope="col">Semester</th>
                                <th scope="col">No. of Attempts</th>
                                <th scope="col">Subjects</th>
                                <th scope="col">Marks Obtained</th>
                                <th scope="col">Out Of</th>
                                <th scope="col">Passing Month & Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {semesters.map((semester, index) => (
                                <tr key={index}>
                                    <td>{semester}</td>
                                    <td>{at[index]}</td>
                                    <td>{sub[index]}</td>
                                    <td>{m[index]}</td>
                                    <td>{out[index]}</td>
                                    <td>{pdate[index]}</td>
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

export default McaResult
