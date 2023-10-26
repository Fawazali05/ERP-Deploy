import React from 'react'
import Sidenav from './sideNavbar'
import { Link } from 'react-router-dom'

const Home1 = () => {
  return (
    <>
      <Sidenav />
      <br />
      <div className='container'>
        <div className=" row mb-3  ">
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Student Profile</h5>
              <Link to="/Admin/StudentDataCard"><button type="button" className="btn btn-primary mx-2">Student Details</button></Link>
            </div>
          </div>
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Previous Academic Results</h5>
              <Link to="/Admin/PreviousResult"><button type="button" className="btn btn-primary mx-2">Previous results</button></Link>
            </div>
          </div>
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Fee Address Parent Details </h5>
              <Link to="/Admin/FeeParents"><button type="button" className="btn btn-primary mx-2">Details</button></Link>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className=" row mb-3  ">
          {/* <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Semester Examination Results</h5>
              <Link to="/Admin/currentMcaResults"><button type="button" className="btn btn-primary mx-2">Results</button></Link>
            </div>
          </div>
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title"> Academic Results</h5>
              <Link to="/Admin/yearResult"><button type="button" className="btn btn-primary mx-2">Results</button></Link>
            </div>
          </div> */}
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Achievements  </h5>
              <Link to="/Admin/Achievements"><button type="button" className="btn btn-primary mx-2">Achievements</button></Link>
            </div>
          </div>
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Training, Internships And Placements</h5>
              <Link to="/Admin/Placements"><button type="button" className="btn btn-primary mx-2">Placements</button></Link>
            </div>
          </div>
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title"> Research Papers</h5>
              <Link to="/Admin/researchPaper"><button type="button" className="btn btn-primary mx-2">Research Paper</button></Link>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className=" row mb-3  ">
          <div className="col card text-center mb-3 " >
            <div className="col card-body">
              <h5 className="card-title">Competitve Exams</h5>
              <Link to="/Admin/ExamCompetitive"><button type="button" className="btn btn-primary mx-2">Details</button></Link>
            </div>
          </div>

          <div className="col card text-center mb-3 " >
            <div className="col card-body ">
              <h5 className="card-title">Student Report </h5>
              <Link to="/Admin/studentReport"><button type="button" className="btn btn-primary mx-2">Reports</button></Link>
            </div>
          </div>
        </div>
      </div>







    </>
  )
}

export default Home1
