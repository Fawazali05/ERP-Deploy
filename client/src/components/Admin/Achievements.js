import React, { useState } from 'react';
import Sidenav from './sideNavbar';
import LogoDesc from './logoDesc';
import Loading from '../loading';


const CompAchievements = () => {
      const [isPrinted, setIsPrinted] = useState(false);
      const [loading, setLoading] = useState(true);
   //print logic 
   const handlePrint = async () => {
     await setIsPrinted(true);
     await window.print(); // Trigger the print dialog
     setIsPrinted(false)
   }

    //const [year, setYear] = useState("");
    const [year1, setYear1] = useState("");
    const [dept, setDept] = useState("");
    const [cat, setCat] = useState("");
    const [level, setLevel] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    /* const handleDownloadClick = (e) => {
        e.preventDefault();
        console.log(year);

        // Make an HTTP request to the server route for downloading the collection
        fetch(`http://localhost:5000/api/files/download/Achievements?AdmissionYear=${year}`)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a temporary URL for the blob data
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'achievementsinfo.csv'; // Set the desired filename
                document.body.appendChild(a);
                a.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading collection:', error);
            });
    }; */
    //const [mcaprn, setMcaprn] = useState("");
    const [formData, setFormData] = useState({});


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
            const response = await fetch(`http://localhost:5000/api/data/fetchAchievements/${year1}/${dept}/${cat}/${level}`, requestOptions);
            // console.log(response);
            //console.log(typeof(response));
            // Check if the response status is OK (200)
            if (response.ok) {
                const responseData = await response.json();
                await setFormData(responseData.formData);
                setIsDisabled(false);
                setLoading(false);
                //console.log(formData);

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
        <div hidden= {isPrinted}>
        <Sidenav />
        </div>
            
           
            <br />
            <div className="container text-center" hidden= {isPrinted}>
                <h3 id="sv">Student Achievements</h3>
                <br />
                <div className="row mb-2">
                    <div className="col">
                        <label htmlFor="year1" className="form-label">Enter the Year Of Admission </label>
                        <input type="text" value={year1} onChange={(e) => setYear1(e.target.value)} className="form-control" name="year1" id="year1" required maxLength={4}/><br />

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
                <div className="row mb-2">
                    <div className="col">
                        <label htmlFor="cat" className="form-label">Type of Achievement </label>
                        <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)} name="cat" id="cat">
                            <option value="">Select an option</option>
                            <option value="Technical">Technical</option>
                            <option value="Non-Technical">Non-Technical</option>
                            <option value="Sports">Sports</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Other">Any Other</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="level" className="form-label">Level of Achievement </label>
                        <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)} name="level" id="level">
                            <option value="">Select an option</option>
                            <option value="Collegiate">Collegiate</option>
                            <option value="Inter-Collegiate">Inter-Collegiate</option>
                            <option value="State">State</option>
                            <option value="National">National</option>
                            <option value="International">International</option>
                        </select>
                    </div>
                </div>

                <br />
                <button className='btn btn-primary' onClick={fetchReport}>Fetch Student Data</button>
                <hr />
            </div>
            
            <div style={{ padding: "0 20px " }} hidden={isDisabled}>
                <br />
                <LogoDesc/>
                <button onClick={handlePrint} hidden={isPrinted} className='btn btn-primary mx-2' >Print</button>
                <br/>
                <h4>Achievements <br/> </h4>
                <div className='row mb-2'>
                    <div className='col'>
                    <h6>Category : {cat } <br/> Level : {level}</h6><br/>
                    </div>
                    <div className='col'>
                    <h6>Department : {dept} <br/> Year of Admission : {year1}</h6>
                    </div>
                </div>
                {loading ? (<Loading/>): (<>
                    {formData.length > 0 ? (
                        formData.map((data, index) => (
                            <div key={index}>
                               { (data.Type1 === cat && data.Level1 === level) || (data.Type2 === cat && data.Level2 === level) || (data.Type3 === cat && data.Level3 === level) ||(data.Type4 === cat && data.Level4 === level) ||(data.Type5 === cat && data.Level5 === level) ? 
                                (<table className='table border'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">REG ID</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Level</th>
                                            <th scope="col">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(data.Type1 === cat && data.Level1 === level) ? (<tr>
                                            <td>{data.Name}</td>
                                            <td>{data.mcaprn}</td>
                                            <th scope="row">{data.Type1}</th>
                                            <td>{data.Level1}</td>
                                            <td>{data.Description1}</td>
                                        </tr>) : null}
                                        {(data.Type2 === cat && data.Level2 === level) ? <tr>
                                            <td>{data.Name}</td>
                                            <td>{data.mcaprn}</td>
                                            <th scope="row">{data.Type2}</th>
                                            <td>{data.Level2}</td>
                                            <td>{data.Description2}</td>
                                        </tr> : null}
                                        {(data.Type3 === cat && data.Level3 === level) ? <tr>
                                            <td>{data.Name}</td>
                                            <td>{data.mcaprn}</td>
                                            <th scope="row">{data.Type3}</th>
                                            <td>{data.Level3}</td>
                                            <td>{data.Description3}</td>
                                        </tr> : null}
                                        {(data.Type4 === cat && data.Level4 === level) ? <tr>
                                            <td>{data.Name}</td>
                                            <td>{data.mcaprn}</td>
                                            <th scope="row">{data.Type4}</th>
                                            <td>{data.Level4}</td>
                                            <td>{data.Description4}</td>
                                        </tr> : null}
                                        {(data.Type5 === cat && data.Level5 === level) ? <tr>
                                            <td>{data.Name}</td>
                                            <td>{data.mcaprn}</td>
                                            <th scope="row">{data.Type5 || null}</th>
                                            <td>{data.Level5 || null}</td>
                                            <td>{data.Description5 || null}</td>
                                        </tr> : null}
                                    </tbody>
                                </table>): null }
                            </div>
                        ))
                    ) : null} </>)}



                
            </div>
        </>
    )
}

export default CompAchievements
