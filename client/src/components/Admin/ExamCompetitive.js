import React, { useState } from 'react';
import Sidenav from './sideNavbar';
import LogoDesc from './logoDesc';

const ExamCompetitive = () => {

    const [isPrinted, setIsPrinted] = useState(false);
    //print logic 
    const handlePrint = async () => {
        await setIsPrinted(true);
        await window.print(); // Trigger the print dialog
        setIsPrinted(false)
    }

    const [exam, setExam] = useState("");
    const [year1, setYear1] = useState("");
    const [dept, setDept] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
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
            const response = await fetch(`http://localhost:5000/api/data/fetchCompetitive/${year1}/${dept}/${exam}`, requestOptions);
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

            <div className="container text-center" hidden={isPrinted}>
                <br />
                <h3 id="sv">Competitive Exam Report </h3>
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
                        <label htmlFor="exam" className="form-label">Type of Exam </label>
                        <select className="form-select" value={exam} onChange={(e) => setExam(e.target.value)} name="exam" id="exam">
                            <option value="">Select an option</option>
                            <option value="GATE">GATE</option>
                            <option value="CAT">CAT</option>
                            <option value="GRE">GRE</option>
                            <option value="MPSC">MPSC</option>
                            <option value="UPSC">UPSC</option>
                            <option value="OtherExam">Other Exams</option>
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

                <h4 > Competitive Exams Report <br /> </h4>
                <br />
                <div className='row mb-2'>
                    <div className='col'>
                        <h6> Year of Admission : {year1} <br /> Type : {exam}</h6><br />
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
                            {data[`${exam}Validity`] === "Valid" || exam === "ALL" ? (<table className='table border'>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">REG ID</th>
                                        <th scope="col">Exam</th>
                                        <th scope="col">Marks Obtained</th>
                                        <th scope="col">Month & Year of Exam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data.Name}</td>
                                        <td>{data.mcaprn}</td>
                                        <td>
                                            {exam === "GATE" && "GATE"}
                                            {exam === "CAT" && "CAT"}
                                            {exam === "GRE" && "GRE"}
                                            {exam === "MPSC" && "MPSC"}
                                            {exam === "UPSC" && "UPSC"}
                                            {exam === "OtherExam" && data.OtherExam}
                                            {exam === "ALL" && (
                                                <>
                                                    {data.GATEValidity === "Valid" && "GATE"}<br />
                                                    {data.CATValidity === "Valid" && "CAT"}<br />
                                                    {data.GREValidity === "Valid" && "GRE"}<br />
                                                    {data.MPSCValidity === "Valid" && "MPSC"}<br />
                                                    {data.UPSCValidity === "Valid" && "UPSC"}<br />
                                                    {data.OtherExamValidity === "Valid" && data.OtherExam}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {exam === "GATE" && data.GATEScore}
                                            {exam === "CAT" && data.CATScore}
                                            {exam === "GRE" && data.GREScore}
                                            {exam === "MPSC" && data.MPSCScore}
                                            {exam === "UPSC" && data.UPSCScore}
                                            {exam === "OtherExam" && data.OtherExamScore}
                                            {exam === "ALL" && (
                                                <>
                                                    {data.GATEValidity === "Valid" && data.GATEScore}<br />
                                                    {data.CATValidity === "Valid" && data.CATScore}<br />
                                                    {data.GREValidity === "Valid" && data.GREScore}<br />
                                                    {data.MPSCValidity === "Valid" && data.MPSCScore}<br />
                                                    {data.UPSCValidity === "Valid" && data.UPSCScore}<br />
                                                    {data.OtherExamValidity === "Valid" && data.OtherExamScore}
                                                </>
                                            )}
                                        </td>
                                        <td>
                                            {exam === "GATE" && data.GateDate}
                                            {exam === "CAT" && data.CATDate}
                                            {exam === "GRE" && data.GREDate}
                                            {exam === "MPSC" && data.MPSCDate}
                                            {exam === "UPSC" && data.UPSCDate}
                                            {exam === "OtherExam" && data.OtherExamDate}
                                            {exam === "ALL" && (
                                                <>
                                                    {data.GATEValidity === "Valid" && data.GateDate}<br />
                                                    {data.CATValidity === "Valid" && data.CATDate}<br />
                                                    {data.GREValidity === "Valid" && data.GREDate}<br />
                                                    {data.MPSCValidity === "Valid" && data.MPSCDate}<br />
                                                    {data.UPSCValidity === "Valid" && data.UPSCDate}<br />
                                                    {data.OtherExamValidity === "Valid" && data.OtherExamDate}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            ) : null}
                        </div>
                    ))
                ) : null}



            </div >

        </>
    )
}

export default ExamCompetitive
