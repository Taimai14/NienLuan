import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [data,setData] = useState({
    email:'',
    username:'',
    password:'',
  })
  const navigate = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    const {email,username,password} = data;
    try {
      await axios.post("auth/register", { email,username,password });
      setData({});
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register ">
      <div className="top">
        <div className="wrapper">
          <button className="loginButton"><Link to="/login" className="link">Sign In</Link></button>
        </div>
      </div>
      <div className="container">
          <form className="input">
            <input type="email" placeholder="email address" value={data.email} onChange={(e) => setData({...data,email: e.target.value})} />
            <input type="username" placeholder="username" value={data.username} onChange={(e) => setData({...data,username: e.target.value})}/>
            <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data,password: e.target.value})}/>
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>

      </div>
    </div>
  );
}