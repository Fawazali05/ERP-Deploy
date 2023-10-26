import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        //console.log(json);
        if (json.success) {
            //save the auth token
            if(json.typeUser === "User"){
                localStorage.setItem('token', json.authToken);
            navigate('/Home');
            }else{
                alert("Invalid User")
            } 
            
        } else {
            alert("Invalid Credentials");
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="page bg-light">
                <div className="contain ">
                    <div className="org-info">
                        <img src="mcoe.png" alt="Organization Logo" />
                        <h4>PES's Modern College Of Engineering</h4>
                        <h4>Department Of MCA</h4>
                    </div>
                    <hr className='line' />
                    <div className="login-contain p-2">
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className="input-contain">
                                <input type="email"name="email" id="email" placeholder="Email" value={credentials.email} onChange={onChange} />
                                <input type="password" placeholder="Password" name="password" id="password" value={credentials.password} onChange={onChange}/>
                                <div className="forgot-pass">
                                    <a href="/forgotpassword">Forgot password?</a>
                                </div>
                                <input type="submit" value="Login" className="submit-btn" />
                            </div>
                            <div>
                                <p>Dont have an account?<Link to="/signup">Sign Up</Link></p>
                                <p>Are you Admin? <Link to="/admin/adminlogin">Go to Admin Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
