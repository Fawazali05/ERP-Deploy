import React from "react";
import '../sidenav.css';
import {useNavigate, Link} from 'react-router-dom';
 
function Sidenav() {
  const navigate = useNavigate();
  function setLogOut(){
    localStorage.removeItem('token');
    navigate('/admin/adminLogin');
  }
    return (<>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      
      <div className="container-fluid" >
      <a className="btn btn-sm" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <img id="sideNav" src="../navbar.png" alt="Click Here"></img>
      </a>
      <h4 id="title1">P.E.S MODERN COLLEGE OF ENGINEERING</h4>
          
        </div>
      

      </nav>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header"><button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>  
  </div>
  <div id="imgDiv"> <img id="img" src="../mcoe.png" alt="Can't fetch img" srcSet="" /><br/> </div>
  <div className="offcanvas-body">
  <div className="list-group">
  
  <Link to="/Admin/home"><button type="button" className="list-group-item list-group-item-action ">Home</button></Link>
  {/* <Link to="/previous_academic_results"><button type="button" className="list-group-item list-group-item-action">Previous Academic Results Details</button></Link>
  <Link to="/fees_address_parents"><button type="button" className="list-group-item list-group-item-action">Fees Address And Parent Details</button></Link>
  <Link to="/mcaResult"><button type="button" className="list-group-item list-group-item-action ">MCA Result</button></Link>
   */}
  <button type="button" className="list-group-item list-group-item-action" onClick={setLogOut} to = '/'>Log Out</button>
  
</div>
   
  </div>
</div>



     
      </>
    );
  }

 
export default Sidenav;