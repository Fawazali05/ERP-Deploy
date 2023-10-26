import React, { useState } from 'react';
import Sidenav from './sideNavbar';
import LogoDesc from './logoDesc';


const Placements = () => {

    const divStyle = {
        pageBreakBefore: 'always', // Inline CSS for page break
        backgroundColor: 'lightgray', // Inline CSS for background color
        padding: '2px', // Inline CSS for padding
    };
    const [isPrinted, setIsPrinted] = useState(false);
    //print logic 
    const handlePrint = async () => {
        await setIsPrinted(true);
        await window.print(); // Trigger the print dialog
        setIsPrinted(false)
    }

    //const [year, setYear] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    /* const handleDownloadClick = (e) => {
        e.preventDefault();
        console.log(year);

        

        // Make an HTTP request to the server route for downloading the collection
        fetch(`http://localhost:5000/api/files/download/Placements?AdmissionYear=${year}`)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a temporary URL for the blob data
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'placements.csv'; // Set the desired filename
                document.body.appendChild(a);
                a.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading collection:', error);
            });
    }; */

    const [formData, setFormData] = useState({});
    const [dept, setDept] = useState("");
    const [year1, setYear1] = useState("");
    const [cat, setCat] = useState("");


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
            const response = await fetch(`http://localhost:5000/api/data/fetchPlacements/${year1}/${dept}/${cat}`, requestOptions);
            // console.log(response);
            //console.log(typeof(response));
            // Check if the response status is OK (200)
            if (response.ok) {
                const responseData = await response.json();
                setFormData(responseData.formData);
                setIsDisabled(false);
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
        <>
            <div hidden={isPrinted}>
                <Sidenav />
                <br />
            </div>

           {/*  <form onSubmit={handleDownloadClick} >
                <div className="container text-center" hidden={isPrinted}>
                    <h3 id="sv">Training Internships and Placements </h3>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="year" className="form-label">Enter the Year Of Admission </label>
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" name="year" id="year" />
                        </div>

                    </div>

                    <button type="submit" className='btn btn-primary'>Download (CSV)</button>
                    <br />
                    <hr />

                </div>
            </form> */}

            <br />
            <div className="container text-center" hidden={isPrinted}>
                {/* ... Form structure */}


                <h3>View Report of Training , Internships and Placements</h3>
                <br />
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="year1" className="form-label">Enter the Year Of Admission </label>
                        <input type="text" value={year1} onChange={(e) => setYear1(e.target.value)} className="form-control" name="year1" id="year1" required maxLength={4} /><br />

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


                    <div className="col">
                        <label htmlFor="cat" className="form-label">Type of Achievement </label>
                        <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)} name="cat" id="cat">
                            <option value="">Select an option</option>
                            <option value="Training">Training & Courses</option>
                            <option value="Internship">Internship</option>
                            <option value="Placement">Placements</option>
                            <option value="ALL">All</option>
                        </select>
                    </div>
                </div>

                <button className='btn btn-primary' onClick={fetchReport}>Fetch Data</button>
                <br /><hr />
            </div>
            

            <div style={{ padding: "0 20px " }} hidden={isDisabled}>
                <br />
                <LogoDesc />
                <button onClick={handlePrint} hidden={isPrinted} className='btn btn-primary mx-2' >Print</button>
                <br />

                <h4 >  Report Type :  {cat} <br /> </h4>
                <br />
                <div className='row mb-2'>
                    <div className='col'>
                        <h6> Year of Admission : {year1} </h6><br />
                    </div>
                    <div className='col'>
                        <h6>Department : {dept} </h6>
                    </div>
                </div>
            </div>
            <div style={{ padding: "0 20px " }}>
                {formData.length > 0 ? (
                    formData.map((data, index) => (
                        <div key={index}>
                            {cat === "Training" ? (<>
                                <h6>Name : {data.Name}
                                    <br />REG Id : {data.mcaprn}
                                </h6>
                                <table className='table border border-dark'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Details</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {data.CourseName1}<br />
                                                {data.CourseName2}<br />
                                                {data.CourseName3}

                                            </td>
                                            <td>
                                                {data.CourseDetails1}<br />
                                                {data.CourseDetails2}<br />
                                                {data.CourseDetails3}

                                            </td>
                                            <td>
                                                {data.CourseDate1}<br />
                                                {data.CourseDate2}<br />
                                                {data.CourseDate3}

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>) : null}
                        </div>
                    ))
                ) : null}

                {formData.length > 0 ? (
                    formData.map((data, index) => (
                        <div key={index}>
                            {cat === "Internship" ? (<>
                                <h6>Name : {data.Name}
                                    <br />REG Id : {data.mcaprn}
                                </h6>
                                <table className='table border border-dark'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">Company Address</th>
                                            <th scope="col">Job Role</th>
                                            <th scope="col">Stipend</th>
                                            <th scope="col">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {data.CName1}<br />
                                                {data.CName2}


                                            </td>
                                            <td>
                                                {data.CAddress1}<br />
                                                {data.CAddress2}


                                            </td>
                                            <td>
                                                {data.P1}<br />
                                                {data.P2}


                                            </td>
                                            <td>
                                                {data.Stipend1}<br />
                                                {data.Stipend2}


                                            </td>
                                            <td>
                                                {data.Duration1}<br />
                                                {data.Duration2}


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>) : null}
                        </div>
                    ))
                ) : null}

                {formData.length > 0 ? (
                    formData.map((data, index) => (
                        <div key={index}>
                            {cat === "Placement" ? (<>
                                <h6>Name : {data.Name}
                                    <br />REG Id : {data.mcaprn}
                                </h6>
                                <table className='table border border-dark'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">Company Address</th>
                                            <th scope="col">Job Role</th>
                                            <th scope="col">Package</th>
                                            <th scope="col">Date of Joining</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {data.CompanyName1}<br />
                                                {data.CompanyName2}


                                            </td>
                                            <td>
                                                {data.CompanyAddress1}<br />
                                                {data.CompanyAddress2}


                                            </td>
                                            <td>
                                                {data.Post1}<br />
                                                {data.Post2}


                                            </td>
                                            <td>
                                                {data.CompanyCTC1}<br />
                                                {data.CompanyCTC2}


                                            </td>
                                            <td>
                                                {data.DateOfJoining1}<br />
                                                {data.DateOfJoining2}


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>) : null}
                        </div>
                    ))
                ) : null}


                {formData.length > 0 ? (
                    formData.map((data, index) => (
                        <div key={index}>
                            {cat === "ALL" ? (<>
                                
                                    <br/>
                                    <h6 style={{padding : "0px 10px"}}>Name : {data.Name}
                                        <br />REG Id : {data.mcaprn}
                                    </h6>
                                    <h6 style={{padding : "0px 10px"}}>Training And Courses</h6>
                                    <table className='table border border-dark'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Details</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.CourseName1}<br />
                                                    {data.CourseName2}<br />
                                                    {data.CourseName3}

                                                </td>
                                                <td>
                                                    {data.CourseDetails1}<br />
                                                    {data.CourseDetails2}<br />
                                                    {data.CourseDetails3}

                                                </td>
                                                <td>
                                                    {data.CourseDate1}<br />
                                                    {data.CourseDate2}<br />
                                                    {data.CourseDate3}

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h6 style={{padding : "0px 10px"}}>Internships</h6>
                                    <table className='table border border-dark'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Company Name</th>
                                                <th scope="col">Company Address</th>
                                                <th scope="col">Job Role</th>
                                                <th scope="col">Stipend</th>
                                                <th scope="col">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.CName1}<br />
                                                    {data.CName2}


                                                </td>
                                                <td>
                                                    {data.CAddress1}<br />
                                                    {data.CAddress2}


                                                </td>
                                                <td>
                                                    {data.P1}<br />
                                                    {data.P2}


                                                </td>
                                                <td>
                                                    {data.Stipend1}<br />
                                                    {data.Stipend2}


                                                </td>
                                                <td>
                                                    {data.Duration1}<br />
                                                    {data.Duration2}


                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h6 style={{padding : "0px 10px"}}>Placements</h6>
                                    <table className='table border border-dark'>
                                        <thead>
                                            <tr>
                                                <th scope="col">Company Name</th>
                                                <th scope="col">Company Address</th>
                                                <th scope="col">Job Role</th>
                                                <th scope="col">Package</th>
                                                <th scope="col">Date of Joining</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.CompanyName1}<br />
                                                    {data.CompanyName2}


                                                </td>
                                                <td>
                                                    {data.CompanyAddress1}<br />
                                                    {data.CompanyAddress2}


                                                </td>
                                                <td>
                                                    {data.Post1}<br />
                                                    {data.Post2}


                                                </td>
                                                <td>
                                                    {data.CompanyCTC1}<br />
                                                    {data.CompanyCTC2}


                                                </td>
                                                <td>
                                                    {data.DateOfJoining1}<br />
                                                    {data.DateOfJoining2}


                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                
                                <br/><div style={divStyle}></div>
                            </>) : null}
                        </div>
                    ))
                ) : null}

            </div >


        </>
    )
}

export default Placements
