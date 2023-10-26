import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';



const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/data/adminlogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        
        if (json.success) {
            //save the auth token
            if (json.typeUser === 'Admin') {
                localStorage.setItem('token', json.authToken);
                navigate('/Admin/home');
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
                        <img src="../mcoe.png" alt="Organization Logo" />
                        <h4>PES's Modern College Of Engineering</h4>
                        <h4>Department Of MCA</h4>
                    </div>
                    <hr className='line' />
                    <div className="login-contain p-2 text-center">
                        <form onSubmit={handleSubmit}>
                            <h2>Admin Login</h2>
                            <div className="input-contain">
                                <input type="email"name="email" id="email" placeholder="Email" value={credentials.email} onChange={onChange} />
                                <input type="password" placeholder="Password" name="password" id="password" value={credentials.password} onChange={onChange}/>
                                <div className="forgot-pass">
                                <a href="/admin/adminforgotpassword">Forgot password?</a>
                                </div>
                                <input type="submit" value="Login" className="submit-btn" />
                            </div>
                            <div>
                                <p>Are you a student?<Link to='/'>Go to Student Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
