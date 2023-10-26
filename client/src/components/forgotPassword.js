import { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Check if the email exists in the database
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/checkEmail", // Replace with your API endpoint to check email existence
        { email },
        config
      );

      if (data.emailExists) {
        // If email exists, proceed with sending the reset password email
        const response = await axios.post(
          "http://localhost:5000/api/auth/forgotpassword", // Replace with your API endpoint to send the email
          { email },
          config
        );
        
        setSuccess(response.data.data);
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError("The provided email is not registered.");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
        <div className="page bg-light">
            <div className="contain">
                <div className="org-info">
                    <img src="mcoe.png" alt="Organization Logo" />
                    <h4>PES's Modern College Of Engineering</h4>
                    <h4>Department Of MCA</h4>
                </div>
                <hr className='line' />
                <div className="login-contain p-2">
                    <form onSubmit={forgotPasswordHandler}>
                        <h2>Forgot Password</h2>
                        <div className="input-contain">
                            <input
                            className="my-2"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <input type="submit" value="Send Reset Email" className="submit-btn" />
                        </div>
                        <div>
                            <p>Remember your password? <Link to="/">Login</Link></p>
                        </div>
                        {error && <div className="error-message text-danger">{error}</div>}
                        {success && <div className="success-message text-success">{success}</div>}
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default ForgotPassword;
