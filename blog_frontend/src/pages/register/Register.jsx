import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit (e){
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span style={{color:"white"}}className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
         <input
         style={{marginBottom:"10px"}}
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
         <input
         style={{marginBottom:"10px"}}
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
           type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      
      {error && <span style={{color:"green", marginTop:"10px"}}>Please Enter Valid credentials</span>}
    </div>
  );
}
