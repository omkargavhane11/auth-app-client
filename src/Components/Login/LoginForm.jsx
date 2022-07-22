import "./loginForm.css";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading"

const LoginForm = () => {

  const navigate=useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [forgetPassword,setForgetPassword] = useState(false);
  const [alert,setAlert]=useState(false);
  const [invalidCredentails,setInvalidCredentails] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleLogin=async(e)=>{
    e.preventDefault();

    if(email.length===0 || password.length===0){
      setAlert(true)
    }else{
      setLoading(true)
      setAlert(false)
      const data = await axios.post("https://auth-app-37.herokuapp.com/user/login",{
        username,
        email,
        password
    }).then((data) => check(data.data));

    function check(data){
      if(data.msg==="success"){
        navigate("/home")
        setForgetPassword(false)
        setUsername("");
        setEmail("");
        setPassword("");
        setShowPass(false);
        setLoading(false)
      }else{
        setForgetPassword(true)
        setInvalidCredentails(true)
      }
    }
    }
  } 


    return (
      <div className="parentContainer">
      <div className="childContainer">
        <form className="loginForm p-2 br-4">
        <div className="mb-3"> 
          <label htmlFor="exampleInputEmail1" className="form-label">Email <span className="astrick">*</span></label>
          <input value={email} type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password <span className="astrick">*</span></label>
          <input value={password} type={showPass ? "text" : "password"} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" onChange={() => setShowPass(!showPass)} className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
        </div>
        {alert?<span className="alert">Please enter all details</span>:""}
        {invalidCredentails?<span className="alert">Invalid credentials</span>:""}
        <div className="buttons">
        
        <button onClick={handleLogin} className="btn btn-success">{loading?<Loading/>:"Log In"}</button>
        {forgetPassword ? (<button onClick={()=> navigate("/verifyemail")} size="sm" className="forgotPassword btn btn-danger ">Forgot Password ?</button>):""}
        <button onClick={()=> navigate("/sign-up")} size="sm" className="signup btn btn-outline-primary">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
    );
}

export default LoginForm;
