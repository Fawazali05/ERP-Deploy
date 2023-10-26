import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


const ResetPassword = ({ history}) => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }
    console.log(history);
    // console.log(match.params.resetToken);
    console.log(resetToken);
    try {
      const { data } = await axios.put(
        // `http://localhost:5000/api/auth/passwordreset/${match.params.resetToken}`,
        `http://localhost:5000/api/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      console.log("data : ",data);

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
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
                    <img src="../mcoe.png" alt="Organization Logo" />
                    <h4>PES's Modern College Of Engineering</h4>
                    <h4>Department Of MCA</h4>
                </div>
                <hr className='line' />
                <div className="login-contain p-2">
                    <form onSubmit={resetPasswordHandler}>
                        <h2>Reset Password</h2>
                        <div className="input-contain">
                            <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <input type="submit" value="Reset Password" className="submit-btn" />
                        </div>
                    </form>
                    {error && <span className="text-danger">{error} </span>}
                    {success && (<span className="text-success">{success} <Link to="/">Login</Link></span>)}
                </div>
            </div>
        </div>
    </>

  );
};

export default ResetPassword;
