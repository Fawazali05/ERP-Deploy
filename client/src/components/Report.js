import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDesc from './logoDesc';
import Loading from './loading';

const Report = () => {
  const [isPrinted, setIsPrinted] = useState(false);
  //print logic 
  const handlePrint = async () => {
    await setIsPrinted(true);
    await window.print(); // Trigger the print dialog
    setIsPrinted(false)
  }
  const navigate = useNavigate();
  const [sem, setSem] = useState([]);
  const [at, setAt] = useState([]);
  const [sub, setSub] = useState([]);
  const [m, setM] = useState([]);
  const [pdate, setPdate] = useState([]);
  const [out, setOut] = useState([]);
  const [c, setC] = useState([]);
  const [o, setO] = useState([]);
  const [t, setT] = useState([]);
  const [p, setP] = useState([]);
  const [s, setS] = useState([]);
  const [y, sety] = useState([]);
  const [image, setImage] = useState({});

  const divStyle = {
    pageBreakBefore: 'always', // Inline CSS for page break
    backgroundColor: 'lightgray', // Inline CSS for background color
    padding: '2px', // Inline CSS for padding
  };
  //const [images, setImages] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch data from MongoDB when the component mounts

    fetchData();
    // eslint-disable-next-line
  }, []);

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
      const response = await fetch('http://localhost:5000/api/student/fetchReport', requestOptions);
      //console.log(response);
      //console.log(typeof(response));
      // Check if the response status is OK (200)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.formData && responseData.formData.length > 6) {
          // Make sure formData is an array with at least two elements
          setImage(responseData.ImageData);
          setData(await responseData.formData);
          setSem(await responseData.formData[3].semesterNumber);
          setAt(await responseData.formData[3].attempt);
          setM(await responseData.formData[3].marks);
          setSub(await responseData.formData[3].subjects);
          setPdate(await responseData.formData[3].passing);
          setOut(await responseData.formData[3].outof);
          setC(await responseData.formData[4].yclass);
          setO(await responseData.formData[4].marksObtained);
          setT(await responseData.formData[4].marksTotal); // Assuming responseData is an array
          setP(await responseData.formData[4].percentage);
          setS(await responseData.formData[4].CGPA);
          sety(await responseData.formData[4].Yearofpassing);
        } else {
          alert("Fill the form completely");
          console.log('Received unexpected or empty formData.');
          navigate('/Home');
        }
      } else {
        // Handle non-successful response (e.g., 4xx or 5xx status)
        alert("Form  incomplete or user not logged in");
        navigate('/');
        //console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      alert("Form  incomplete or user not logged in");
        navigate('/');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };


  return (
    <>
      <button onClick={handlePrint} hidden={isPrinted} className='btn btn-primary mx-2' >Print</button>
      <br />
      <br />
      <LogoDesc />
      <br />
      <br />
      {loading ? (<Loading/>) : (<>


        <div style={{ padding: "0 20px " }} >

          <div className=' row '>
            <div className='col border border-dark' >
              <h4>Student Profile</h4>
            </div>
            <div className='col border border-dark' style={{ textAlign: 'center' }}>
              {image && image[0] ? (
                <img src={image[0].url} alt={image[0].title} style={{ width: '150px', height: '180px', display: 'block', margin: '0 auto', padding: '10px 0px' }} />
              ) : (
                <p>Profile Photo Here</p>
              )}
            </div>

          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Name (As per Marksheet)</h6>
              <p>{data[0].Name}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Date Of Birth</h6>
              <p>{data[0].Birthday}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Gender</h6>
              <p>{data[0].Gender}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Religion</h6>
              <p>{data[0].Religion}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Category Of Admission</h6>
              <p>{data[0].CategoryOfAdmission}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Caste</h6>
              <p>{data[0].Caste}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Blood Group</h6>
              <p>{data[0].Bloodgroup}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Email Address</h6>
              <p>{data[0].Email}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Year of Admission in First Year</h6>
              <p>{data[0].AdmissionYear}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>PRN No.</h6>
              <p>{data[0].PRN}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Name of Mentor</h6>
              <p>{data[0].Mentor}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Course</h6>
              <p>{data[0].Course}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Name of Project Guide</h6>
              <p>{data[0].ProjectGuide}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Mobile No.</h6>
              <p>{data[0].Mobile1}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Alternate Mobile No.</h6>
              <p>{data[0].Mobile2}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={divStyle}></div>
        <div style={{ padding: "0 20px " }} >
          <h4>Result Of 10th </h4>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Year Of Passing 10th</h6>
              <p>{data[1].SSCYear}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Name Of School</h6>
              <p>{data[1].SSCSchool}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Name Of Board</h6>
              <p>{data[1].SSCBoard}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Marks Obtained</h6>
              <p>{data[1].SSCMarks}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Out Of</h6>
              <p>{data[1].SSCTotal}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Percentage</h6>
              <p>{data[1].SSCPercent}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <h4>Result Of 12th </h4>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Year Of Passing 12th</h6>
              <p>{data[1].HSCYear}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Name Of College</h6>
              <p>{data[1].HSCSchool}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Name Of Board</h6>
              <p>{data[1].HSCBoard}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Marks Obtained</h6>
              <p>{data[1].HSCMarks}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Out Of</h6>
              <p>{data[1].HSCTotal}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Percentage</h6>
              <p>{data[1].HSCPercent}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Medium of Instruction in School</h6>
              <p>{data[1].Medium}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Mathematics Marks in 10th</h6>
              <p>{data[1].MathSsc}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Mathematics Marks in 12th</h6>
              <p>{data[1].MathsHsc}</p>
            </div>
          </div>
        </div>
        <br />

        <br />
        <div style={{ padding: "0 20px " }} >
          <h4>Result Of Graduation</h4>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Year Of Passing</h6>
              <p>{data[1].YearOfPassingUg}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Name Of College</h6>
              <p>{data[1].NameOfUgCollege}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Name of University</h6>
              <p>{data[1].University}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Marks Obtained</h6>
              <p>{data[1].GraduationMarks}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Out Of</h6>
              <p>{data[1].GraduationTotal}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Percentage / CGPA</h6>
              <p>{data[1].GraduationPercent}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={divStyle}></div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <h4>Fees Details</h4>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Name Of Mentor</h6>
              <p>{data[2].MentorName}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Fees Of FY</h6>
              <p>{data[2].FyFees}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Date Of Paying FY Fees</h6>
              <p>{data[2].DateFyFees}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Fees Of SY</h6>
              <p>{data[2].SyFees}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Date Of Paying SY Fees</h6>
              <p>{data[2].DateSyFees}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <h4>Address Details</h4>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Temporary Address</h6>
              <p>{data[2].TemporaryAddress}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Permanent Address</h6>
              <p>{data[2].PermanentAddress}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <h4>Parents Details</h4>
          <br />
          <h5>Father's Details</h5>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Name</h6>
              <p>{data[2].FatherName}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Profession</h6>
              <p>{data[2].FatherProfession}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Work Address</h6>
              <p>{data[2].FatherWorkAddress}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Contact</h6>
              <p>{data[2].FatherContact}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Email Address</h6>
              <p>{data[2].FatherEmail}</p>
            </div>
          </div>
        </div>
        <br />

        <div style={{ padding: "0 20px " }} >
          <br />
          <h5>Mother's Details</h5>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Name</h6>
              <p>{data[2].MotherName}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Profession</h6>
              <p>{data[2].MotherProfession}</p>
            </div>
            <div className='col border border-dark' >
              <h6>Work Address</h6>
              <p>{data[2].MotherWorkAddress}</p>
            </div>
          </div>
          <div className=' row '>
            <div className='col border border-dark' >
              <h6>Contact</h6>
              <p>{data[2].MotherContact}</p>
            </div>
            <div className='col  border border-dark' >
              <h6>Email Address</h6>
              <p>{data[2].MotherEmail}</p>
            </div>
          </div>
        </div>
        <br />
        <div style={divStyle}></div>
        <br />


        <div style={{ padding: "0 20px " }} >
          <div style={{ padding: "0 20px " }} >
            <h5>Semester Subject Wise Results</h5>
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
              {data[3] ? (<><tbody>
                {sem.map((semester, index) => (
                  <tr key={index}>
                    <td>{semester}</td>
                    <td>{at[index]}</td>
                    <td>{sub[index]}</td>
                    <td>{m[index]}</td>
                    <td>{out[index]}</td>
                    <td>{pdate[index]}</td>
                  </tr>
                ))}
              </tbody></>) : ""}
            </table>


          </div>
          <br />
          <div style={divStyle}></div>
          <br />

        </div>

        <div style={{ padding: "0 20px " }} >
          <h5>Academic  Results</h5>
          <table className='table border'>
            <thead>
              <tr>
                <th scope="col">Class / Semester</th>
                <th scope="col">Marks Obtained</th>
                <th scope="col">Total Marks</th>
                <th scope="col">Percentage</th>
                <th scope="col">CGPA / SGPA</th>
                <th scope="col">Passing Month & Year</th>
              </tr>
            </thead>
            {data[4] ? (<><tbody>
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
            </tbody></>) : ""}
          </table>


        </div>
        <br />
        <div style={divStyle}></div>
        <br />

        <div style={{ padding: "0 20px " }} >
          <br />
          <h4>Achievements</h4><br />
          <div className=' border border-dark' style={{ padding: "0 20px " }}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Level</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {data[5].Level1 ? (<><tr>
                  <th scope="row">{data[5].Type1}</th>
                  <td>{data[5].Level1}</td>
                  <td>{data[5].Description1}</td>
                </tr></>) : ""}
                {data[5].Level2 ? (<><tr>
                  <th scope="row">{data[5].Type2}</th>
                  <td>{data[5].Level2}</td>
                  <td>{data[5].Description2}</td>
                </tr></>) : ""}
                {data[5].Level3 ? (<><tr>
                  <th scope="row">{data[5].Type3}</th>
                  <td>{data[5].Level3}</td>
                  <td>{data[5].Description3}</td>
                </tr></>) : ""}
                {data[5].Level5 ? (<><tr>
                  <th scope="row">{data[5].Type5}</th>
                  <td>{data[5].Level5}</td>
                  <td>{data[5].Description4}</td>
                </tr></>) : ""}
                {data[5].Level5 ? (<><tr>
                  <th scope="row">{data[5].Type5}</th>
                  <td>{data[5].Level5}</td>
                  <td>{data[5].Description5}</td>
                </tr></>) : ""}

              </tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: "0 20px " }} >
          <br />
          <h4>Competitive Exams</h4><br />
          <div className=' border border-dark' style={{ padding: "0 20px " }}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Name Of Exam</th>
                  <th scope="col">Score Obtained</th>
                  <th scope="col">Month And Year Of Exam</th>
                </tr>
              </thead>
              <tbody>
                {data[5].GATEValidity === "Valid" ? (<><tr>
                  <th scope="row">GATE</th>
                  <td>{data[5].GATEScore}</td>
                  <td>{data[5].GateDate}</td>
                </tr></>) : ""}
                {data[5].GATEValidity === "Valid" ? (<><tr>
                  <th scope="row">GATE</th>
                  <td>{data[5].GATEScore}</td>
                  <td>{data[5].GateDate}</td>
                </tr></>) : ""}
                {data[5].CATValidity === "Valid" ? (<><tr>
                  <th scope="row">CAT</th>
                  <td>{data[5].CATScore}</td>
                  <td>{data[5].CATDate}</td>
                </tr></>) : ""}
                {data[5].GREValidity === "Valid" ? (<><tr>
                  <th scope="row">GRE</th>
                  <td>{data[5].GREScore}</td>
                  <td>{data[5].GREDate}</td>
                </tr></>) : ""}
                {data[5].MPSCValidity === "Valid" ? (<><tr>
                  <th scope="row">MPSC</th>
                  <td>{data[5].MPSCScore}</td>
                  <td>{data[5].MPSCDate}</td>
                </tr></>) : ""}
                {data[5].UPSCValidity === "Valid" ? (<><tr>
                  <th scope="row">UPSC</th>
                  <td>{data[5].UPSCScore}</td>
                  <td>{data[5].UPSCDate}</td>
                </tr></>) : ""}

                {data[5].OtherExamValidity === "Valid" ? (<><tr>
                  <th scope="row">{data[5].OtherExam}</th>
                  <td>{data[5].OtherExamScore}</td>
                  <td>{data[5].OtherExamDate}</td>
                </tr></>) : ""}

              </tbody>
            </table>
          </div>
        </div>
        <br/>
        <div style={divStyle}></div>
        <div style={{ padding: "0 20px " }} >
          <br />
          <h4>Training And Courses</h4><br />
          <div className=' border border-dark' style={{ padding: "0 20px " }}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Name Of Course</th>
                  <th scope="col">Details</th>
                  <th scope="col">Month And Year</th>
                </tr>
              </thead>
              <tbody>
                {data[6].CourseName1 ? (<><tr>
                  <th scope="row">{data[6].CourseName1}</th>
                  <td>{data[6].CourseDetails1}</td>
                  <td>{data[6].CourseDate1}</td>
                </tr></>) : ""}
                {data[6].CourseName2 ? (<><tr>
                  <th scope="row">{data[6].CourseName2}</th>
                  <td>{data[6].CourseDetails2}</td>
                  <td>{data[6].CourseDate2}</td>
                </tr></>) : ""}
                {data[6].CourseName3 ? (<><tr>
                  <th scope="row">{data[6].CourseName3}</th>
                  <td>{data[6].CourseDetails3}</td>
                  <td>{data[6].CourseDate3}</td>
                </tr></>) : ""}

              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <br />
          <h4>Internship Details</h4><br />
          <div className=' border border-dark' style={{ padding: "0 20px " }}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Name Of Company </th>
                  <th scope="col"> Address</th>
                  <th scope="col">Post</th>
                  <th scope="col">Stipend</th>
                  <th scope="col">Duration (in Months)</th>
                </tr>
              </thead>
              <tbody>
                {data[6].CName1 ? (<><tr>
                  <th scope="row">{data[6].CName1}</th>
                  <td>{data[6].CAddress1}</td>
                  <td>{data[6].P1}</td>
                  <td>{data[6].Stipend1}</td>
                  <td>{data[6].Duration1}</td>
                </tr></>) : ""}
                {data[6].CName2 ? (<><tr>
                  <th scope="row">{data[6].CName2}</th>
                  <td>{data[6].P2}</td>
                  <td>{data[6].CAddress2}</td>
                  <td>{data[6].Stipend2}</td>
                  <td>{data[6].Duration2}</td>
                </tr></>) : ""}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div style={{ padding: "0 20px " }} >
          <br />
          <h4>Placement Details</h4><br />
          <div className=' border border-dark' style={{ padding: "0 20px " }}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col">Name Of Company </th>
                  <th scope="col"> Address</th>
                  <th scope="col">Post</th>
                  <th scope="col">Package</th>
                  <th scope="col">Date Of Joining</th>
                </tr>
              </thead>
              <tbody>
                {data[6].CompanyName1 ? (<><tr>
                  <th scope="row">{data[6].CompanyName1}</th>
                  <td>{data[6].CompanyAddress1}</td>
                  <td>{data[6].Post1}</td>
                  <td>{data[6].CompanyCTC1}</td>
                  <td>{data[6].DateOfJoining1}</td>
                </tr></>) : ""}
                {data[6].CompanyName2 ? (<><tr>
                  <th scope="row">{data[6].CompanyName2}</th>
                  <td>{data[6].Post2}</td>
                  <td>{data[6].CompanyAddress2}</td>
                  <td>{data[6].CompanyCTC2}</td>
                  <td>{data[6].DateOfJoining2}</td>
                </tr></>) : ""}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div style={divStyle}></div>
        {data[7] ? (<div style={{ padding: "0 20px " }}>
          <h4>Published Research Paper</h4><br />
          <div className='row'>
            <div className='col border border-dark'>
              <h6>Name Of Guide</h6>
              <p>{data[7].NameOfStaff || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>Title Of Paper</h6>
              <p>{data[7].TitleOfPaper || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>Name Of Journal/Conference</h6>
              <p>{data[7].NameOfJournal || ''}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col border border-dark'>
              <h6>ISSN/ISBN, Vol, issue, page no.</h6>
              <p>{data[7].ISSN || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>DOI</h6>
              <p>{data[7].DOI || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>Listed in Database/Peer Reviewed/UGC/SCOPUS</h6>
              <p>{data[7].TypeOfListing || ''}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col border border-dark'>
              <h6>Date Of Publication</h6>
              <p>{data[7].DateOfPublication || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>Impact Factor</h6>
              <p>{data[7].ImpactFactor || ''}</p>
            </div>
            <div className='col border border-dark'>
              <h6>Paper Link</h6>
              <p>{data[7].PaperLink || ''}</p>
            </div>
          </div>
          <br />
        </div>):null}


        <div style={{ padding: "0 20px " }}>
          {image && image.length > 0 && (
            <div>
              {image.slice(1).map((d) => (
                <div key={d._id} className="d-card">
                  <div style={divStyle}></div>
                  <h6>{d.title}</h6>
                  <img src={d.url} alt={d.title} style={{ width: '100%', height: '100%' }} />
                </div>
              ))}
            </div>

          )}
          <br />
        </div>

        <br />
      </>
      )}

    </>
  )
}

export default Report
