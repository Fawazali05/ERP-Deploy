import React, { useState } from 'react';
import Sidenav from './sideNavbar';
import Loading from '../loading'

const CurrentMcaResults = () => {

    const [year, setYear] = useState("");
    const handleDownloadClick = (e) => {
        e.preventDefault();
        console.log(year);

        // Make an HTTP request to the server route for downloading the collection
        fetch(`http://localhost:5000/api/files/download/mcaResult?AdmissionYear=${year}`)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a temporary URL for the blob data
                const url = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'mcaResults.csv'; // Set the desired filename
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
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e) => {
        setMcaprn(e.target.value);
    };
    const handleFetchDataClick = () => {
        // Make an HTTP request to the server route to fetch student data
        fetch(`http://localhost:5000/api/data/fetchCurrentMcaResult/${mcaprn}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Update the form data with fetched data
                setFormData(data);
                setLoading(false);
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
                    <h3 id="sv">MCA Results (All Students)</h3>

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

                    <h3>View Result Of Individual Student</h3>
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
                <br />
            </div>
            {loading ? (<Loading/>) : (<>
            <div className="container text-center">
                <br />
                <h3>MCA First Year Result</h3><br />
                <h4>Semester 1</h4>
                <br />
                <div className='row mb-4'>
                    <div className='col'>Subject Name</div>
                    <div className='col'>Number Of Attempts</div>
                    <div className='col'>Marks Obtained</div>
                    <div className='col'>Out Of</div>
                    <div className='col'>Month And Year Of Passing</div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Discrete Mathematics and Statistics</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DiscreteMathematicsAndStatisticsAttempt} onChange={handleInputChange} name="DiscreteMathematicsAndStatisticsAttempt" id="DiscreteMathematicsAndStatisticsAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DiscreteMathematicsMarks} onChange={handleInputChange} name="DiscreteMathematicsMarks" id="DiscreteMathematicsMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DiscreteMathematicsTotal} onChange={handleInputChange} name="DiscreteMathematicsTotal" id="DiscreteMathematicsTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.DiscreteMathematicsPassingdate} onChange={handleInputChange} name="DiscreteMathematicsPassingdate" id="DiscreteMathematicsPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Data Structures and Algorithms</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataStructuresAndAlgorithmsAttempt} onChange={handleInputChange} name="DataStructuresAndAlgorithmsAttempt" id="DataStructuresAndAlgorithmsAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataStructuresMarks} onChange={handleInputChange} name="DataStructuresMarks" id="DataStructuresMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataStructuresTotal} onChange={handleInputChange} name="DataStructuresTotal" id="DataStructuresTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.DataStructuresPassingdate} onChange={handleInputChange} name="DataStructuresPassingdate" id="DataStructuresPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Object Oriented Programming</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ObjectOrientedProgrammingAttempt} onChange={handleInputChange} name="ObjectOrientedProgrammingAttempt" id="ObjectOrientedProgrammingAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ObjectOrientedProgrammingMarks} onChange={handleInputChange} name="ObjectOrientedProgrammingMarks" id="ObjectOrientedProgrammingMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ObjectOrientedProgrammingTotal} onChange={handleInputChange} name="ObjectOrientedProgrammingTotal" id="ObjectOrientedProgrammingTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.ObjectOrientedProgrammingPassingdate} onChange={handleInputChange} name="ObjectOrientedProgrammingPassingdate" id="ObjectOrientedProgrammingPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Software Engineering & Project Management</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareEngineeringProjectManagementAttempt} onChange={handleInputChange} name="SoftwareEngineeringProjectManagementAttempt" id="SoftwareEngineeringProjectManagementAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareEngineeringProjectManagementMarks} onChange={handleInputChange} name="SoftwareEngineeringProjectManagementMarks" id="SoftwareEngineeringProjectManagementMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareEngineeringProjectManagementMarksTotal} onChange={handleInputChange} name="SoftwareEngineeringProjectManagementMarksTotal" id="SoftwareEngineeringProjectManagementMarksTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.SoftwareEngineeringProjectManagementMarksPassingdate} onChange={handleInputChange} name="SoftwareEngineeringProjectManagementMarksPassingdate" id="SoftwareEngineeringProjectManagementMarksPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Information Systems and Engineering Economics</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.InformationSystemsEngineeringEconomicsAttempt} onChange={handleInputChange} name="InformationSystemsEngineeringEconomicsAttempt" id="InformationSystemsEngineeringEconomicsAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.InformationSystemsEngineeringEconomicsMarks} onChange={handleInputChange} name="InformationSystemsEngineeringEconomicsMarks" id="InformationSystemsEngineeringEconomicsMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.InformationSystemsEngineeringEconomicsTotal} onChange={handleInputChange} name="InformationSystemsEngineeringEconomicsTotal" id="InformationSystemsEngineeringEconomicsTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.InformationSystemsEngineeringEconomicsPassingdate} onChange={handleInputChange} name="InformationSystemsEngineeringEconomicsPassingdate" id="InformationSystemsEngineeringEconomicsPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Data Structures and Algorithms Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataStructuresAttempt} onChange={handleInputChange} name="LabDataStructuresAttempt" id="LabDataStructuresAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataStructuresMarks} onChange={handleInputChange} name="LabDataStructuresMarks" id="LabDataStructuresMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataStructuresTotal} onChange={handleInputChange} name="LabDataStructuresTotal" id="LabDataStructuresTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabDataStructuresPassingdate} onChange={handleInputChange} name="LabDataStructuresPassingdate" id="LabDataStructuresPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Object Oriented Programming Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabObjectOrientedProgrammingAttempt} onChange={handleInputChange} name="LabObjectOrientedProgrammingAttempt" id="LabObjectOrientedProgrammingAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabObjectOrientedProgrammingMarks} onChange={handleInputChange} name="LabObjectOrientedProgrammingMarks" id="LabObjectOrientedProgrammingMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabObjectOrientedProgrammingTotal} onChange={handleInputChange} name="LabObjectOrientedProgrammingTotal" id="LabObjectOrientedProgrammingTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabObjectOrientedProgrammingPassingdate} onChange={handleInputChange} name="LabObjectOrientedProgrammingPassingdate" id="LabObjectOrientedProgrammingPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Python Programming Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabPythonAttempt} onChange={handleInputChange} name="LabPythonAttempt" id="LabPythonAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabPythonMarks} onChange={handleInputChange} name="LabPythonMarks" id="LabPythonMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabPythonTotal} onChange={handleInputChange} name="LabPythonTotal" id="LabPythonTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabPythonPdate} onChange={handleInputChange} name="LabPythonPdate" id="LabPythonPdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <h4>Semester 2 </h4>

                <br />
                <div className='row mb-4'>
                    <div className='col'>Subject Name</div>
                    <div className='col'>Number Of Attempts</div>
                    <div className='col'>Marks Obtained</div>
                    <div className='col'>Out Of</div>
                    <div className='col'>Month And Year Of Passing</div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Database Management System</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DatabaseManagementSystemAttempt} onChange={handleInputChange} name="DatabaseManagementSystemAttempt" id="DatabaseManagementSystemAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DatabaseManagementSystemMarks} onChange={handleInputChange} name="DatabaseManagementSystemMarks" id="DatabaseManagementSystemMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DatabaseManagementSystemTotal} onChange={handleInputChange} name="DatabaseManagementSystemTotal" id="DatabaseManagementSystemTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.DatabaseManagementSystemPassingdate} onChange={handleInputChange} name="DatabaseManagementSystemPassingdate" id="DatabaseManagementSystemPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Computer Network</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ComputerNetworkAttempts} onChange={handleInputChange} name="ComputerNetworkAttempts" id="ComputerNetworkAttempts" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ComputerNetworkMarks} onChange={handleInputChange} name="ComputerNetworkMarks" id="ComputerNetworkMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.ComputerNetworkTotal} onChange={handleInputChange} name="ComputerNetworkTotal" id="ComputerNetworkTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.ComputerNetworkPassingdate} onChange={handleInputChange} name="ComputerNetworkPassingdate" id="ComputerNetworkPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Java Programming</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.JavaAttempt} onChange={handleInputChange} name="JavaAttempt" id="JavaAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.JavaMarks} onChange={handleInputChange} name="JavaMarks" id="JavaMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.JavaTotal} onChange={handleInputChange} name="JavaTotal" id="JavaTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.JavaPassingdate} onChange={handleInputChange} name="JavaPassingdate" id="JavaPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Operating System</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.OperatingSystemAttempt} onChange={handleInputChange} name="OperatingSystemAttempt" id="OperatingSystemAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.OperatingSystemMarks} onChange={handleInputChange} name="OperatingSystemMarks" id="OperatingSystemMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.OperatingSystemTotal} onChange={handleInputChange} name="OperatingSystemTotal" id="OperatingSystemTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.OperatingSystemPassingdate} onChange={handleInputChange} name="OperatingSystemPassingdate" id="OperatingSystemPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Database Management System Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDatabaseManagementAttempt} onChange={handleInputChange} name="LabDatabaseManagementAttempt" id="LabDatabaseManagementAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDatabaseManagementMarks} onChange={handleInputChange} name="LabDatabaseManagementMarks" id="LabDatabaseManagementMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDatabaseManagementTotal} onChange={handleInputChange} name="LabDatabaseManagementTotal" id="LabDatabaseManagementTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabDatabaseManagementPassingdate} onChange={handleInputChange} name="LabDatabaseManagementPassingdate" id="LabDatabaseManagementPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Operating System Lab</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabOperatingSystemAttempt} onChange={handleInputChange} name="LabOperatingSystemAttempt" id="LabOperatingSystemAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabOperatingSystemMarks} onChange={handleInputChange} name="LabOperatingSystemMarks" id="LabOperatingSystemMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabOperatingSystemTotal} onChange={handleInputChange} name="LabOperatingSystemTotal" id="LabOperatingSystemTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabOperatingSystemPassingdate} onChange={handleInputChange} name="LabOperatingSystemPassingdate" id="LabOperatingSystemPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label"> Java Programming Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabJavaAttempt} onChange={handleInputChange} name="LabJavaAttempt" id="LabJavaAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabJavaMarks} onChange={handleInputChange} name="LabJavaMarks" id="LabJavaMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabJavaTotal} onChange={handleInputChange} name="LabJavaTotal" id="LabJavaTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabJavaPassingdate} onChange={handleInputChange} name="LabJavaPassingdate" id="LabJavaPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="Elective1" className="form-label">Elective 1 (Enter the name of respective subject)</label>
                        <input type="text" value={'' || formData.Elective1} onChange={handleInputChange} name="Elective1" id="Elective1" className="form-control"></input>
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective1Attempt} onChange={handleInputChange} name="Elective1Attempt" id="Elective1Attempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective1Marks} onChange={handleInputChange} name="Elective1Marks" id="Elective1Marks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective1Total} onChange={handleInputChange} name="Elective1Total" id="Elective1Total" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="month" value={'' || formData.Elective1Passingdate} onChange={handleInputChange} name="Elective1Passingdate" id="Elective1Passingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <br />
                <br />
                <hr />
                <br />
                <div className="row mb-5">
                    <div className="col">
                        <label htmlFor="FYmarksObtained" className="form-label">Total Marks Obtained</label>
                        <input type="text" value={'' || formData.FYmarksObtained} onChange={handleInputChange} name="FYmarksObtained" id="FYmarksObtained" className="form-control" disabled= "true"></input>
                    </div>
                    <div className="col">
                        <label htmlFor="FYmarksOutOf" className="form-label">Out Of</label>
                        <input type="text" value={'' || formData.FYmarksOutOf} onChange={handleInputChange} name="FYmarksOutOf" id="FYmarksOutOf" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="FyPercent" className="form-label"> Percentage</label>
                        <input type="text" value={'' || formData.FyPercent} onChange={handleInputChange} name="FyPercent" id="FyPercent" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="FySgpa" className="form-label"> SGPA </label>
                        <input type="text" value={'' || formData.FySgpa} onChange={handleInputChange} name="FySgpa" id="FySgpa" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="FYPassingYear" className="form-label"> Year Of Passing First Year </label>
                        <input type="text" value={'' || formData.FYPassingYear} onChange={handleInputChange} name="FYPassingYear" id="FYPassingYear" className="form-control" disabled= "true" />
                    </div>
                </div>

            </div>
            <hr />
            <div className="container text-center">
                <br />
                <h3>MCA Second Year Result</h3><br />
                <h4>Semester 3</h4>
                <br />
                <div className='row mb-4'>
                    <div className='col'>Subject Name</div>
                    <div className='col'>Number Of Attempts</div>
                    <div className='col'>Marks Obtained</div>
                    <div className='col'>Out Of</div>
                    <div className='col'>Month And Year Of Passing</div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label"> Data Science</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataScienceAttempt} onChange={handleInputChange} name="DataScienceAttempt" id="DataScienceAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataScienceMarks} onChange={handleInputChange} name="DataScienceMarks" id="DataScienceMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.DataScienceTotal} onChange={handleInputChange} name="DataScienceTotal" id="DataScienceTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.DataSciencePassingdate} onChange={handleInputChange} name="DataSciencePassingdate" id="DataSciencePassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Web Technologies</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.WebTechnologiesAttempt} onChange={handleInputChange} name="WebTechnologiesAttempt" id="WebTechnologiesAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.WebTechnologiesMarks} onChange={handleInputChange} name="WebTechnologiesMarks" id="WebTechnologiesMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.WebTechnologiesTotal} onChange={handleInputChange} name="WebTechnologiesTotal" id="WebTechnologiesTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.WebTechnologiesPassingdate} onChange={handleInputChange} name="WebTechnologiesPassingdate" id="WebTechnologiesPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Cloud Computing</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.CloudComputingAttempt} onChange={handleInputChange} name="CloudComputingAttempt" id="CloudComputingAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.CloudComputingMarks} onChange={handleInputChange} name="CloudComputingMarks" id="CloudComputingMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.CloudComputingTotal} onChange={handleInputChange} name="CloudComputingTotal" id="CloudComputingTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.CloudComputingPassingdate} onChange={handleInputChange} name="CloudComputingPassingdate" id="CloudComputingPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label"> Software Testing and Quality Assurance</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareTestingAttempt} onChange={handleInputChange} name="SoftwareTestingAttempt" id="SoftwareTestingAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareTestingMarks} onChange={handleInputChange} name="SoftwareTestingMarks" id="SoftwareTestingMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.SoftwareTestingTotal} onChange={handleInputChange} name="SoftwareTestingTotal" id="SoftwareTestingTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.SoftwareTestingPassingdate} onChange={handleInputChange} name="SoftwareTestingPassingdate" id="SoftwareTestingPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Web Technologies Lab</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabWebTechnologiesAttempt} onChange={handleInputChange} name="LabWebTechnologiesAttempt" id="LabWebTechnologiesAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabWebTechnologiesMarks} onChange={handleInputChange} name="LabWebTechnologiesMarks" id="LabWebTechnologiesMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabWebTechnologiesTotal} onChange={handleInputChange} name="LabWebTechnologiesTotal" id="LabWebTechnologiesTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabWebTechnologiesPassingdate} onChange={handleInputChange} name="LabWebTechnologiesPassingdate" id="LabWebTechnologiesPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Software Testing Laboratory + Elective II Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabSoftwareTestingAttempt} onChange={handleInputChange} name="LabSoftwareTestingAttempt" id="LabSoftwareTestingAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabSoftwareTestingMarks} onChange={handleInputChange} name="LabSoftwareTestingMarks" id="LabSoftwareTestingMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabSoftwareTestingTotal} onChange={handleInputChange} name="LabSoftwareTestingTotal" id="LabSoftwareTestingTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabSoftwareTestingPassingdate} onChange={handleInputChange} name="LabSoftwareTestingPassingdate" id="LabSoftwareTestingPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Data Science Laboratory</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataScienceAttempt} onChange={handleInputChange} name="LabDataScienceAttempt" id="LabDataScienceAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataScienceMarks} onChange={handleInputChange} name="LabDataScienceMarks" id="LabDataScienceMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.LabDataScienceTotal} onChange={handleInputChange} name="LabDataScienceTotal" id="LabDataScienceTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.LabDataSciencePassingdate} onChange={handleInputChange} name="LabDataSciencePassingdate" id="LabDataSciencePassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="Elective2" className="form-label">Elective 2 (Enter the name of respective subject)</label>
                        <input type="text" value={'' || formData.Elective2} onChange={handleInputChange} name="Elective2" id="Elective2" className="form-control" disabled= "true"></input>
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective2Attempt} onChange={handleInputChange} name="Elective2Attempt" id="Elective2Attempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective2Marks} onChange={handleInputChange} name="Elective2Marks" id="Elective2Marks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="text" value={'' || formData.Elective2Total} onChange={handleInputChange} name="Elective2Total" id="Elective2Total" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label className="form-label"> <br /></label>
                        <input type="month" value={'' || formData.Elective2Passingdate} onChange={handleInputChange} name="Elective2Passingdate" id="Elective2Passingdate" className="form-control" disabled= "true" />
                    </div>
                </div>

                <br />
                <hr />
                <br />

                <h4>Semester 4 </h4>

                <br />
                <div className='row mb-4'>
                    <div className='col'>Subject Name</div>
                    <div className='col'>Number Of Attempts</div>
                    <div className='col'>Marks Obtained</div>
                    <div className='col'>Out Of</div>
                    <div className='col'>Month And Year Of Passing</div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label className="form-label">Major Project</label>
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.MajorProjectAttempt} onChange={handleInputChange} name="MajorProjectAttempt" id="MajorProjectAttempt" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.MajorProjectMarks} onChange={handleInputChange} name="MajorProjectMarks" id="MajorProjectMarks" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="text" value={'' || formData.MajorProjectTotal} onChange={handleInputChange} name="MajorProjectTotal" id="MajorProjectTotal" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <input type="month" value={'' || formData.MajorProjectPassingdate} onChange={handleInputChange} name="MajorProjectPassingdate" id="MajorProjectPassingdate" className="form-control" disabled= "true" />
                    </div>
                </div>

                <br />
                <br />
                <hr />
                <br />
                <div className="row mb-5">
                    <div className="col">
                        <label htmlFor="SYMarksObtained" className="form-label">Total Marks Obtained</label>
                        <input type="text" value={'' || formData.SYMarksObtained} onChange={handleInputChange} name="SYMarksObtained" id="SYMarksObtained" className="form-control" disabled= "true"></input>
                    </div>
                    <div className="col">
                        <label htmlFor="SYMarksOutOf" className="form-label">Out Of</label>
                        <input type="text" value={'' || formData.SYMarksOutOf} onChange={handleInputChange} name="SYMarksOutOf" id="SYMarksOutOf" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="SyPercent" className="form-label"> Percentage</label>
                        <input type="text" value={'' || formData.SyPercent} onChange={handleInputChange} name="SyPercent" id="SyPercent" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="SySgpa" className="form-label"> SGPA </label>
                        <input type="text" value={'' || formData.SySgpa} onChange={handleInputChange} name="SySgpa" id="SySgpa" className="form-control" disabled= "true" />
                    </div>
                    <div className="col">
                        <label htmlFor="SYPassingYear" className="form-label"> Year Of Passing Second Year</label>
                        <input type="text" value={'' || formData.SYPassingYear} onChange={handleInputChange} name="SYPassingYear" id="SYPassingYear" className="form-control" disabled= "true" />
                    </div>
                </div>

                <br />

               

            </div></>)}
        </>
    )
}

export default CurrentMcaResults
