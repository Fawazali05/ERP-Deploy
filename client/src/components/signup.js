import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Signup = () => {
  function validateEmail(email) {
    // Define a regular expression pattern for the desired format
    const emailPattern = /@moderncoe\.edu\.in$/;

    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
  }

  const [credentials, setCredentials] = useState({ firstname: "", Branch: "", email: "", password: "", AdmissionYear:"" })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}; // Create an object to store validation errors
  
    if (!validateEmail(credentials.email)) {
      validationErrors.email = 'Invalid email format. Please enter a valid email address.';
    }
    if (credentials.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }
    if (credentials.Branch === "") {
      validationErrors.Branch = 'Please select the branch';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      // Set the validation errors in state and return early
      setErrors(validationErrors);
      setTimeout(() => {
        setErrors("");
      }, 5000);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname: credentials.firstname,
          Branch: credentials.Branch,
          email: credentials.email,
          password: credentials.password,
          AdmissionYear: credentials.AdmissionYear
        })
      });
  
      const json = await response.json();
  
      if (response.ok) {
        if (json.success) {
          // Save the auth token
          localStorage.setItem('token', json.authToken);
          console.log(json);
          navigate('/Home');
        } else {
          // Handle the case where the API indicates an error
          setErrors({ email: json.error });
          setTimeout(() => {
            setErrors("");
          }, 5000);
          alert("Invalid Credentials");
        }
      } else {
        // Handle non-successful response (e.g., 4xx or 5xx status)
        setErrors({ email: json.error });
        setTimeout(() => {
          setErrors("");
        }, 5000);
        alert(json.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while processing your request");
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateEmail(credentials.email)) {
  //     setErrors({ email: 'Invalid email format. Please enter a valid email address.' });
  //     setTimeout(() => {
  //       setErrors("");
  //     }, 5000);
  //   }
  //   else if (credentials.password.length < 6) {
  //     setErrors({ password: 'Password must be at least 6 characters long.' });
  //     setTimeout(() => {
  //       setErrors("");
  //     }, 5000);
  //   } 
  //   else if(credentials.Branch === "")
  //   {
  //     setErrors({Branch:'Please select the branch'});
  //     setTimeout(() => {
  //       setErrors("");
  //     }, 5000);
  //   }
  //   else
  //   {
  //     // setCredentials({
  //     //   firstName: '',
  //     //   email: '',
  //     //   password: '',
  //     // });
  //     // setErrors({});

  //     try {
  //       const response = await fetch("http://localhost:5000/api/auth/createUser", {
  //         method: "POST",
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ firstname: credentials.firstname, Branch: credentials.Branch, email: credentials.email, password: credentials.password, AdmissionYear:credentials.AdmissionYear })
  //       });

  //       const json = await response.json();
          
  //       setErrors({ email:json.error});
  //       setTimeout(() => {
  //         setErrors("");
  //       }, 5000);
  //       console.log("above res.ok");
  //       if (response.ok) {
          
  //         console.log("in res.ok");
          
  //         if (json.success) {
  //           // Save the auth token
  //           localStorage.setItem('token', json.authToken);
  //           console.log(json);
  //           navigate('/Home');
  //         } else {
  //           alert("Invalid Credentials");
  //         }
  //       } else {
  //         // Handle non-successful response (e.g., 4xx or 5xx status)
  //         // alert("Request failed with status: " + response.error);
  //         alert(json.error);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       alert("An error occurred while processing your request");
  //     }
  //   }

  // };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="page bg-light">
{/* {errors.email && <div className="invalid-feedback">{errors.email}</div>} */}
        <div className="contain ">
          <div className="org-info">
            <img src="mcoe.png" alt="Organization Logo" />
            <h4>PES's Modern College Of Engineering</h4>
            <h4>Department Of MCA</h4>
          </div>
          <hr className='line' />
          <div className="login-contain p-2">
            <form onSubmit={handleSubmit}>
              <h2>Signup</h2>
              <div className="input-contain">
                <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={credentials.firstname}
                onChange={onChange}
                className={` ${errors.firstname ? 'is-invalid' : ''}`}
                />
                <input
                type="text"
                name="AdmissionYear"
                id="AdmissionYear"
                placeholder="Year of Admission"
                value={credentials.AdmissionYear}
                onChange={onChange}
                />
                <select
                name="Branch"
                id="Branch"
                value={credentials.Branch}
                className={` ${errors.Branch ? 'is-invalid' : ''}`}
                onChange={onChange}>
                <option value="">Select your Department</option>
                <option value="MCA">MCA</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
                <option value="AIDS">AIDS</option>
                <option value="AIML">AIML</option>
                <option value="ENTC">ENTC</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                </select>
                {errors.Branch && <div className="invalid-feedback">{errors.Branch}</div>}
                <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={credentials.email}
                onChange={onChange}
                className={` ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                className={` ${errors.password ? 'is-invalid' : ''}`}
                />
                <p className='text-warning'>Password must be atleast 6 characters long</p>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                <input type="submit" value="Signup" className="submit-btn" />
                <div>
                  <p>Already have an account?<Link to="/">Login</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
