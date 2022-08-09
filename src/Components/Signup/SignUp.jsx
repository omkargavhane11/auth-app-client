import "./signup.css";
import axios from "axios";
import {useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const [showPass, setShowPass] = useState(false);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [alert,setAlert]=useState(false);
    const [signedUp,setSignedUp] = useState(false);

    const handleSignUp = async(e) => {
        e.preventDefault();

        if(email.length===0 || password.length===0){
          setAlert(true);
        }else{
          const data = await axios.post("https://auth-app-37.herokuapp.com/user/signup",{
            username,
            email,
            password
        }).then((data) => checkStatus(data.data));

        function checkStatus(data) {
          if(data.msg==="success"){
            setSignedUp(true)

          }
        }

        setUsername("");
        setEmail("");
        setPassword("");
        setShowPass(false);
        }
        
    }


  return (
    <div className="parentContainer">
      <div className="childContainer">
        {signedUp ?(
    <form className="loginForm p-2 br-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username <span className="astrick">*</span></label>
          <input  value={username} onChange={(e)=> setUsername(e.target.value)}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address <span className="astrick">*</span></label>
          <input  value={email} onChange={(e)=> setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password <span className="astrick">*</span></label>
          <input  value={password} onChange={(e)=> setPassword(e.target.value)} type={showPass ? "text" : "password"} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" onClick={()=>setShowPass(!showPass)} className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
        </div>
        {alert?<span className="alert">Please fill all required details</span>:""}
        <div className="buttons">
        <button onClick={handleSignUp} size="sm" className="signup btn btn-success">Sign Up</button>
        <button onClick={()=> navigate("/")} size="sm" className="signup btn btn-primary">Go to Login</button>
        </div>
  </form>):(
    <div className="signedup">
        <h4>Signed Up successfully !</h4>
        <button onClick={()=> navigate("/")} size="sm" className="signup btn btn-success">Login to Continue</button>
    </div>
  )}
   </div>
   </div>
  )
}
