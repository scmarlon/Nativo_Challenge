import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from 'react-router-dom';


function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    
    const checkInfo = () =>{


      if (email === "admin@nativo.com" && password === "12345") {
        console.log("Está Nashe")
        navigate("/a")
        
        
      } else { 
        console.log("email or password bad")
        
      }

    }
    const loginSubmit = (e) => {
      e.preventDefault();
      checkInfo();
      
    };
  
    return (
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form id="loginform" onSubmit={loginSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <p></p>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
  export default Login;