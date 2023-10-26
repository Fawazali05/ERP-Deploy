import React, { useState } from 'react';
import Sidenav from './sideNavbar';
import LogoDesc from './logoDesc';

const ResearchPaper = () => {
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



    //const [year, setYear] = useState("");
    const [dept, setDept] = useState("");
    const [year1, setYear1] = useState("");

    /* const handleDownloadClick = (e) => {
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
        fetch(`http://localhost:5000/api/files/download/ResearchPaper?AdmissionYear=${year}`, requestOptions)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a temporary URL for the blob data
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'researchPaper.csv'; // Set the desired filename
                document.body.appendChild(a);
                a.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading collection:', error);
            });
    };
 */
    const [formData, setFormData] = useState({});




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
            const response = await fetch(`http://localhost:5000/api/data/fetchResearchPaper/${year1}/${dept}`, requestOptions);
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
                
            </div>
            {/* <form onSubmit={handleDownloadClick} >
                <div className="container text-center" hidden={isPrinted}>
                    <h3 id="sv">Published Research Papers (All Students)</h3>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="year" className="form-label">Enter the Year Of Admission </label>
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" name="year" id="year" />
                        </div>

                    </div>

                    <button type="submit" className='btn btn-primary'>Download (CSV)</button>

                    <hr />
                </div>
            </form> */}


            <br />
            <div className='container text-center' hidden={isPrinted}>
                <h3 id="sv">Research Papers</h3>
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
                <br /><hr />
            </div>


            <div style={{ padding: "0 20px " }} hidden={isDisabled}>
                
                <button onClick={handlePrint} hidden={isPrinted} className='btn btn-primary mx-2' >Print</button>
                



                {formData.length > 0 ? (
                    formData.map((data, index) => (
                        
                        <div key={index}>
                            <br />
                <LogoDesc /><br/>
                <br />

                <h4 > Research Papers Published </h4>
                <br />
                            {data.NameOfStaff ? (<>
                                <div className='row mb-2'>
                                    <div className='col'>
                                        <h6> Year of Admission : {year1} </h6><br />
                                    </div>
                                    <div className='col'>
                                        <h6>Department : {dept} </h6>
                                    </div>
                                </div>
                                <h6>Name : {data.Name}
                                    <br />REG Id : {data.mcaprn}
                                </h6>
                                <br />
                                <div className='row'>
                                    <div className='col border border-dark'>
                                        <h6>Name Of Guide</h6>
                                        <p>{data.NameOfStaff || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>Title Of Paper</h6>
                                        <p>{data.TitleOfPaper || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>Name Of Journal/Conference</h6>
                                        <p>{data.NameOfJournal || ''}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col border border-dark'>
                                        <h6>ISSN/ISBN, Vol, issue, page no.</h6>
                                        <p>{data.ISSN || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>DOI</h6>
                                        <p>{data.DOI || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>Listed in Database/Peer Reviewed/UGC/SCOPUS</h6>
                                        <p>{data.TypeOfListing || ''}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col border border-dark'>
                                        <h6>Date Of Publication</h6>
                                        <p>{data.DateOfPublication || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>Impact Factor</h6>
                                        <p>{data.ImpactFactor || ''}</p>
                                    </div>
                                    <div className='col border border-dark'>
                                        <h6>Paper Link</h6>
                                        <p>{data.PaperLink || ''}</p>
                                    </div>
                                </div><div style={divStyle}></div><br />
                            </>) : null}
                        </div>
                    ))
                ) : null}

            </div>

        </>
    )
}

export default ResearchPaper
