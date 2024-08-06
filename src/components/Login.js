import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token' , json.authtoken);
            props.showAlert("Successfully logged in", "success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Details", "danger")
          }
    }

    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div className='mt-3'>
      <h2>Login to continue to iNotebook</h2>
        <form  onSubmit={handleSubmit}>
        <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
    </div>
  )
}

export default Login
