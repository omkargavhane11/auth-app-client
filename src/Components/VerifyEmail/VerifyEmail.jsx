import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {

  const navigate= useNavigate();
  const [email,setEmail]=useState("");
  const[userVerified,setUserVerified]=useState(false);
  const [alert,setAlert]=useState(false);

  const handleVerifyEmail=async (e) => {

    e.preventDefault();
    if(!email.length===0){
      const checkEmail = await axios.post(`https://auth-app-37.herokuapp.com/user/verifyemail/${email}`);
      if(checkEmail.data.msg === "success"){
        setUserVerified(true)
      }
    }else{
      setAlert(true);
    }
    

  }

    return (
      <div className="parentContainer">
      <div className="childContainer">
        {!userVerified ? 
        (<form className="loginForm p-2 br-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        {alert?<span className="alert">Please enter valid email address</span>:""}
        <button onClick={handleVerifyEmail} type="submit" className="btn btn-primary">Submit</button>
        <button onClick={()=> navigate("/")} size="sm" style={{marginTop:"10px"}} className="signup btn btn-outline-primary">Go to Login</button>
      </form>)
      :(
        <h5>Visit Password reset link sent to your email to set New Password</h5>
      )
      }
       </div>
    </div>
    );
}

export default VerifyEmail;
